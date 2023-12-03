import express from "express"
import userRoute from "./userRoute/userRoute"

const route = express();
route.use("/api",userRoute) 
export default route