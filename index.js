import express from "express"
import { config } from "dotenv"
import bootstrab from "./src/bootstrap.js"
const app=express()
config()
const port=process.env.PORT

bootstrab(app,express)

app.listen(port,()=>{
console.log("server running")
})

