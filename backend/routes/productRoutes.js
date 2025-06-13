import express from "express";
import { createProduct, getAllProducts,getProduct,updateProduct,deleteProduct} from "../controllers/productControllers.js";
 
const router=express.Router();

router.get("/",getAllProducts);
router.get("/:id",getProduct);
router.post("/",createProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

export default router;