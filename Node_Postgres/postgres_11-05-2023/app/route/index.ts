import express from "express"
import userRoute from "./userRoute/userRoute"
import postRouter from "./postsRoute/postsRoute";
import profileRoute from "./profileRoute/profileRoute";
import categoryRoute from "./categoryRoute/categoryRoute";

const route = express();

// UserRoute
route.use("/api",userRoute) 

//postRoote
route.use("/api", postRouter)

// profileRoute
route.use("/api",profileRoute)


// categoryRoute
route.use("/api",categoryRoute)

export default route