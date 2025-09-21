import  jwt  from "jsonwebtoken";
import { config } from "dotenv";
config()
export const GenerateToken=({payload={},signature=process.env.SIGNUP_SIGNATURE,expiresIn=60*60}={})=>{
    const token=jwt.sign(payload,signature,{expiresIn:parseInt(expiresIn)})
    return token
}


export const varifyToken=({token,signature=process.env.SIGNUP_SIGNATURE}={})=>{
const decoded=jwt.verify(token,signature)
return decoded
}