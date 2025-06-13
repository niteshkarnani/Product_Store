import { create } from "zustand";
import axios from "axios";
import ProductPage from "../pages/ProductPage";

import toast from "react-hot-toast";
 
import AddProductModal from "../components/AddProductModal";


const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:3000":"";


export const useProductStore=create((set,get)=>({
    products:[],
    loading:false,
    error:null,
    currentProduct:null,

    formData:{
        name:"",
        price:"",
        image:""
    },
    setFormData:(formData)=>set({formData}),
    resetFormData:()=>set({formData:{name:"",price:"",image:""}}),

    addProduct: async(e)=>{
        e.preventDefault();

        set({loading:true});
        try {
            const {formData}=get();
            await axios.post(`${BASE_URL}/api/products`,formData);
            await get().fetchProducts();
            get().resetFormData();
            toast.success("Item added successfully");
            document.getElementById("add_product_modal").close();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }finally{
            set({loading:false});
        }
    },

    fetchProducts : async()=>{
        set({loading:true});
        try {
            const response=await axios.get(`${BASE_URL}/api/products`);
            set({products:response.data.data,error:null});
        } catch (err) {
            if (err.status == 429) set({error:"Rate Limited excedded",products:[]});
            else set({error:"You cant find the error",products:[]});
        }
        finally{
            set({loading:false});
        }
    },
    deleteProduct:async(id)=>{
        set({loading:true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev=>({products:prev.products.filter(product=>product.id!==id)}));
            toast.success("product deleted successfully")
        } catch (error) {
            console.log("error in deleting product",error);
            toast.error("Something went wrong");
        }finally{
            set({loading:false});
        }

    },
    fetchProduct: async(id)=>{
        set({loading:true});
        try {
            const response=await axios.get(`${BASE_URL}/api/products/${id}`);
            set({
                currentProduct:response.data.data,
                formData:response.data.data,
                error:null
            });
            
        } catch (error) {
            console.log("Error in fetching the desired product");
            set({error:"something went wrong",currentProduct:null});
            toast.error("Cant fetch product");
        }finally{
            set({loading:false});
        }
    },
    updateProduct: async(id)=>{
        set({loading:true});
        try {
            const {formData}=get();
            const response=await axios.put(`${BASE_URL}/api/products/${id}`,formData);
            set({currentProduct:response.data.data});
            toast.success("Item added successfully");
            
        } catch (error) {
            console.log("Something went wrong",error);
            toast.error("Cant update the product");
        }finally{
            set({loading:false});
        }
    }
}));