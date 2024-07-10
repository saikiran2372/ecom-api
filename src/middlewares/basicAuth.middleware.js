import { UserModel } from "../features/user/user.model.js";
const basicAuthorizer=(req,res,next)=>{
    //check if authorization header empty

    const authHeader=req.headers["authorization"];
    if(!authHeader){
        res.status(401).send("No authorization details found")
    }
    //extract credentails
    console.log(authHeader)
    const base64credentials=authHeader.replace("Basic ","");
    console.log(base64credentials)
    const decodedCreds=Buffer.from(base64credentials,"base64").toString("utf8")
    console.log(decodedCreds);
    const creds=decodedCreds.split(":");
    console.log(creds)
    const users=UserModel.getAll()
    console.log(users)
    const newuser=users.find((user)=>{
return user.email==creds[0] && user.password==creds[1]
    })
   
    if(newuser){
        next();
    }
    else{
        res.status(401).send("incorrect credentials")
    }


}
export default basicAuthorizer;