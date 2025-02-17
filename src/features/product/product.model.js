import { ApplicationError } from "../../errorhandler/applicationError.js";
import { UserModel } from "../user/user.model.js";
export default class ProductModel{
    constructor(id, name, desc, price, imageUrl, category, sizes){
        this._id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
    }

    static GetAll(){
        return products;
    }
    static add(product){
        product.id=products.length+1;
        products.push(product)
        return product

    }
    static get(id){
      const product=products.find((product)=>product.id==id);
      return product;

    }
    static filter(minPrice,maxPrice,category){
      console.log(minPrice,maxPrice,category)
      const result=products.filter((product)=>{
      return   (!minPrice || 
        product.price >= minPrice) &&
      (!maxPrice || 
        product.price <= maxPrice) &&
      (!category || 
        product.category == category)
       
      })
      console.log(result)
      return result
     
    }
    static rateProduct(userID,productID,rating){
      const user=UserModel.getAll().find(u=>u.id==userID);

      const product=products.find(p=>p.id==productID);
      if(!user){
        throw new ApplicationError("User Not Found",404);
      }
      if(!product){
        throw new ApplicationError("product not found",400);
      }
//check ratings
if(!product.ratings){
  product.ratings=[];
  product.ratings.push({
    userID:userID,
    rating:rating
  })
  }else{
   const existingRatingIndex= product.ratings.findIndex(r=>r.userID==userID);
   if(existingRatingIndex>=0){
    product.ratings[existingRatingIndex]={
      userID:userID,
    rating:rating

    }
   }else{
    product.ratings.push({
      userID:userID,
    rating:rating
    })

   }
  }
 }
 } 

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Category1',

    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];