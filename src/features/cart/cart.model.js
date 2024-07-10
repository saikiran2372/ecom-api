export class CartModel{
    constructor(productID,userID,quantity,id){
        this.productID=productID,
        this.userID=userID,
        this.quantity=quantity,
        this.id=id
        
    }
    static add(productID,userID,quantity){

        const cartItem=new CartModel(productID,userID,quantity)
        cartItem.id=cartItems.length+1;
        cartItems.push(cartItem);
    }
    static get(userID){
       const item= cartItems.filter(cartitem=>cartitem.userID==userID);
       return item;
    }
    static delete(cartItemID,userID){
        const cartItemIndex=cartItems.findIndex(i=>i.id==cartItemID&&i.userID==userID);
        if(cartItemIndex==-1){
          return "Item not found"
        }
        else{
            cartItems.splice(cartItemIndex,1);

        }
    }
    
}

var cartItems=[
    new CartModel(1,2,1,1),
    new CartModel(1,1,2,2)
]