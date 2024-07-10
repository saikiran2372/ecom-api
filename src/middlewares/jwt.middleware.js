import jwt from "jsonwebtoken"

const jwtAuth=(req,res,next)=>{
    
    const token=req.headers["authorization"]
    if(!token){
        return res.status(401).send("unauthorized error");
    }
    try{
    const payLoad=jwt.verify(token,process.env.JWT_SEC);
    req.userID=payLoad.userID;
    console.log(payLoad)


    }catch(err){
        return res.status(401).send("unauthorized")

    }
    next();
}
export default jwtAuth