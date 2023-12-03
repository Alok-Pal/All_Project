import expres from "express"
import UserRoute from "./userRoute/userRoute"

const route = expres.Router()
route.use("/get",UserRoute)

export default  route