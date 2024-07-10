import { ApplicationError } from "../../errorhandler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
export class UserRepository{
    async signUp(newUser){
        try{ const db=getDB();
         const collection=db.collection("users");
        await collection.insertOne(newUser)
        return newUser;
         }catch(err){
             throw new ApplicationError("Something went wrong",500)
         }
 
     };

     async findByEmail(email){
        try{ const db=getDB();
         const collection=db.collection("users");
       return  await collection.findOne({email});
        
         }catch(err){
            console.log(err)
             throw new ApplicationError("Something went wrong",500)
         }
 
     }
}