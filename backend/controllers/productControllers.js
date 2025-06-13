import { sql } from "../config/db.js";

export const getAllProducts=async(req,res)=>{
    try {
        const products=await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
        console.log("feteched products",products);
        res.status(200).json({success:true,data:products});
        
    } catch (error) {
        console.log("error",error);
        res.status(500).json({success:false,message:"error.message"});
    }
};
export const createProduct=async(req,res)=>{
    const {name,price,image}=req.body;
    if(!name || !price || !image){
        return res.status(400).json({success:false,message:"All field are required"});
    }

    try {
        const newproduct=await sql`
        INSERT INTO products (name,price,image)
        VALUES (${name},${price},${image})
        RETURNING *
        `;

        res.status(201).json({success:true,data:newproduct[0]});
        
    } catch (error) {
        console.log("Error creating product",error);
        res.status(500).json({success:false,message:"Internal error"});
    }
};

export const getProduct=async(req,res)=>{
    const {id}=req.params;
    try {
        const product=await sql`
        SELECT * FROM products
        WHERE id=${id}
        `;
        res.status(200).json({success:true,data:product[0]});
        
    } catch (error) {
        console.log("Errot in getting product",error);
        res.status(500).json({success:false,message:"internal server error"});
    }
};
export const updateProduct=async(req,res)=>{
    const {id}=req.params;
    const {name,price,image}=req.body;

    try {
        const updatedProduct=await sql`
        UPDATE products
        SET name=${name},price=${price},image=${image}
        WHERE id=${id}
        RETURNING *
        `;

        if(updateProduct.length===0){
            return res.status(404).json({success:false,message:"NO RELATED PRODUCT FOUNd"});
        }
        res.status(200).json({success:true, data:updatedProduct[0]});
        
    } catch (error) {
        console.log("ERROR IN UPDATE",error);
        res.status(500).json({success:false,message:"INTERNAL SERVER ERROR"});
    }
};
export const deleteProduct=async(req,res)=>{
    const {id}=req.params;

    try {
    const deletedProduct=await sql `
     DELETE FROM products WHERE id=${id} RETURNING *
    `;

    if(deletedProduct.length===0){
        res.status(404).json({success:false,message:"Product not found"});
    }
    res.status(200).json({success:true,data:deletedProduct[0]});
    } catch (error) {
        console.log("error in delte function",error);
        res.status(500).json({success:false,message:"INTERNAL SERVER ERROR"});
    }
};