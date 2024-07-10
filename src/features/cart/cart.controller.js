import { CartModel } from "./cart.model.js";
export class CartItemController{
    add(req,res){
        const{productID,quantity}=req.body;
        const userID=req.userID;
        CartModel.add(userID,productID,quantity);
        res.status(201).send("Cart is updated");
    }
    get(req,res){
        const userID=req.userID;
        const items=CartModel.get(userID)
       res.status(200).send(items)
    }
    delete(req,res){
        const userID=req.userID;
        const cartItemID=req.params.id;
         const error=CartModel.delete(cartItemID,userID);
   if(error){
    return res.status(404).send(error)
   }
   else{
    return res.status(200).send("cart item removed")
   }
    }
}