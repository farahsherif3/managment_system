import { config } from "dotenv"
config()
export const asyncHandler=(fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch((error)=>{
            return next(new Error(error,{cause:500}))
        })
    }
}

export const globalError=(error,req,res,next)=>{
    if(req.validationResult){
        return res.status(error.cause||500).json({message:error.message,details:req.validationResult.details})
    }
    if(process.env.MOOD=='DEV'){
        return res.status(error.cause||500).json({globalErrorMessage:error.message,stack:error.stack})
    }
    return res.status(error.cause||500).json({message:error.message})
}