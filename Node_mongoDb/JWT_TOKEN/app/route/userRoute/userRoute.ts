import express from "express"
import userController from "../../controller"
import authUser   from "../../middleware/auth"
import userAuth from "../../middleware/userValidation/userValidation"

const userRoute = express.Router();
userRoute.post("/registerUser",userAuth.emailPasswordCheck ,userController.userController.registerUser);
userRoute.post("/loginUser",userAuth.emailPasswordCheck,userController.userController.login)
userRoute.get("/getUser",authUser.authentication,userController.userController.getUser)
export default userRoute