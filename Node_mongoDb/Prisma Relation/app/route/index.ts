import express from "express"
import userRouter from "./userRoute/userRoute"; 
import postRoute from "./postRoute/postRoute"

const route = express.Router()
route.use("/user",userRouter)
route.use("/posts", postRoute)
export default route