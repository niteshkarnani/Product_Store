import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

import path from "path";

dotenv.config();

const app=express();
const PORT=process.env.PORT||3000;
const __dirname=path.resolve();
app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy:false,
}));
app.use(morgan("dev"));

app.use(async (req,res,next)=>{
    try {
        const decision=await aj.protect(req,{
            requested:1,
        });
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(409).json({error:"TOO MANY REQUESTS"});
            }else if(decision.reason.isBot()){
                res.status(402).json({error:"BOt access DENIED"});
            }else{
                res.status(402).json({error:"FOrbidden"});
            }
            return;
        }
        if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({error:"spoof bot detected"});
            return;
        }


        next();

        
    } catch (error) {
        console.log("ERROR",error);
        res.status(500).json({success:false,message:error.message});
        next(error);
    }
})

app.use("/api/products",productRoutes);
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}
async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("Data initiallized successfully");
    } catch (error) {
        console.log("Error initializing DB",error);
    }  
}

initDB().then(()=>{
    app.listen(3000,()=>{
        console.log("server is running on port 3000");
    });
});