import "./env.js"
import express from "express";


import swagger from "swagger-ui-express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import apiDocs from "./swagger.json" assert {type:"json"};
import cors from "cors";
import { logger,loggerMiddleware } from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/errorhandler/applicationError.js";
import { connectToMongoDB,getDB } from "./src/config/mongodb.js";
const server=express();

var corsOptions={
    origin:"http://localhost:5500"
}

server.use(cors(corsOptions))
server.use(bodyParser.json())
server.use("/api-docs",swagger.serve,swagger.setup(apiDocs))
server.use(loggerMiddleware)

server.get("/",(req,res)=>{res.send("welcome to api server")});
//for all request related product redirect to product routes
server.use("/api/products",jwtAuth,productRouter)
server.use("/api/users",userRouter);



server.use("/api/cartItems",jwtAuth,cartRouter);

server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message)

    }
    let errData=`${req.url}-${JSON.stringify(req.body)} ${err}`
    logger.info(errData)
    res.status(500).send("please try later")
})
server.use((req,res)=>{
res.status(404).send("API not found,please check documentation for more information at localhost:3200/api-docs"); 
})
server.listen(3200,()=>{
    console.log("server is listening at 3200");
    connectToMongoDB()
});
