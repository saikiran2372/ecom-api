import { ApplicationError } from "../../errorhandler/applicationError.js";
import { UserModel } from "./user.model.js"
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository.js";
import bcrypt from "bcrypt";

export class UserController{
   constructor(){
    this.userRepository= new UserRepository()
   }

   async signUp(req,res){
    try{
        console.log(req.body);
        const{name,email,password,type}=req.body

        const hashedPassword= await bcrypt.hash(password,12)
        const newuser= new UserModel(name,email,hashedPassword,type)
        await this.userRepository.signUp(newuser)
        res.status(201).send(newuser)}
        catch(err){
            throw new ApplicationError("something is wrong in usercontroller",500);
        }
       

    }
    async singIn(req,res){
       try{ const email=req.body.email;
        const password=req.body.password;
       const user =await this.userRepository.findByEmail(email);
       if(!user){
        return res.status(400).send("invalid credentails");  
       }else{
        //cpmpare password with hasshed password
      const result= await bcrypt.compare(password,user.password)
      if(result){
        const token=jwt.sign({
            userID:result.id,email:result.email
        },process.env.JWT_SEC,{expiresIn:"2H"});
        return res.status(200).send(token);

      }else{
        return res.status(400).send("invalid credentails");  

      }
       }

        

        
        

    }catch(err){
        console.log(err)
        res.send("something went wrong")
    }
}}