import express from "express"
import userRoute from "./userRoute/userRoute";
import postRoute from "./postRoute/postRoute";
import commentsRoute from "./commentsRoute/commentsRoute";
import categoryRoute from "./categoryRoute/categoryRoute";

const route = express.Router()
// User
route.use("/api", userRoute)

// Posts
route.use("/api", postRoute)

// Comments
route.use("/api", commentsRoute)

// category
route.use("/api",categoryRoute)
export default route