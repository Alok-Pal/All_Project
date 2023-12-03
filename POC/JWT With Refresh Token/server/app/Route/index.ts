import express from "express"
import userRoute from "./userRoute"



const route = express()

route.use("/api", userRoute)



export default route