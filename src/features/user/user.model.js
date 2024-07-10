import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/applicationError.js";

export class UserModel{
    constructor(name,email,password,type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        this._id=id;
    }

  
    static getAll(){
        return users
    }

}
var users=[{
    id:1,
    name:"Seller user",
    email:"seller@ecom.com",
    password:"password1",
    type:"seller",
},
{   id:2,
    name:"Customer user",
    email:"customer@ecom.com",
    password:"password1",
    type:"customer",
},
]
