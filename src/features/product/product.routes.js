//manage routes to product controller

import express from "express";
import {upload} from "../../middlewares/fileupload.middleware.js"
import ProductController from "./product.controller.js";
import ProductRepository from "./product.repository.js";

const productRouter=express.Router();
const productController=new ProductController()
productRouter.get("/",(req,res)=>{
    productController.getAllProducts(req,res);
});
productRouter.post("/",upload.single("imageUrl"),(req,res)=>{
    productController.addProduct(req,res)
});
productRouter.post("/rate",productController.rateProduct)

productRouter.get("/filter",productController.filteredProducts)
productRouter.get("/:id",(req,res)=>{
    productController.getOneProduct(req,res)
});


export default productRouter;