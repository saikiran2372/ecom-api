import express from "express";
import { UserController } from "./user.controller.js";

const userController=new UserController();
const userRouter=express.Router();

userRouter.post("/signup",(req,res)=>{
   userController.signUp(req,res)
});

userRouter.post("/signin",(req,res)=>{
    userController.singIn(req,res);
});

export default userRouter;