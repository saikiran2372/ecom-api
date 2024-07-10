import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController{
  
  constructor(){
    this.productRepository=new ProductRepository();
  }
   
   async getAllProducts(req,res){
try{
  
  const products=await this.productRepository.getAll();
  console.log(products)
  res.status(200).send(products)
}catch(err){
  console.log(err)
  res.status(500).send("something went wrong");
}
}
   async addProduct(req,res)
    {
      try{
        const{name,price,sizes}=req.body;
        const newProduct=new ProductModel(name,parseFloat(price),sizes.split(","),req.file.filename);
        const createdRecord=await this.productRepository.addProduct(newProduct);
        res.status(201).send(createdRecord)

      }catch(err){
        console.log(err)
        return res.status(200).send("something went wrong");

      }
     
    
   
    }
    filteredProducts(req,res){
      console.log("hello")
      const minPrice=req.query.minPrice;
      const maxPrice=req.query.maxPrice;
      const category=req.query.category;
      const result=ProductModel.filter(minPrice,maxPrice,category)
      res.status(200).send(result);
    }
   
    async getOneProduct(req,res){
      try{
        const id=req.params.id;
        const product=await this.productRepository.getOne(id);
        if(!product){
          res.status(404).send("Product not found")
        }
      return res.status(200).send(product);
         

      }catch(err){
        console.log(err)
        res.status(500).send("something went wrong")
      }
     


      
     

    }
    rateProduct(req,res){
      console.log(req.query)
      const userID=req.query.userID;
      const productID=req.query.productID;
      const rating=req.query.rating;
      try{ProductModel.rateProduct(userID,productID,rating);}
      catch(error){
        return res.status(401).send(error.message)
      }
      
      
      return res.status(200).send("rating has been added");
      

    }
   
   
   }