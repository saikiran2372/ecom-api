
import { getDB } from "../../config/mongodb.js"
import { ApplicationError } from "../../errorhandler/applicationError.js";
import { ObjectId } from "mongodb";

class ProductRepository{
    constructor(){
        this.collection="products"
    }
   
    async addProduct(newProduct){
       try{ const db=getDB();
        const collection=db.collection(this.collection);
       await collection.insertOne(newProduct);
       return newProduct;


       }catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong",500);

       }

    }
    async getAll(){
        try{
            const db=getDB();
            const collection=db.collection(this.collection);
            return await collection.find()

            }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500);
        }
    }

    async getOne(id){
        try{
            const db=getDB();
            const collection=db.collection(this.collection);
            collection.findOne({_id:ObjectId(id)})

        }catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500);
        }
    }
  
}

export default ProductRepository