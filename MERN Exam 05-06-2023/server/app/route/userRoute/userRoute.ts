import express from "express"
import userController from "../../controller"
import UserAuthorization from "../../middleware/auth/auth"

const userRoute = express()

userRoute.post("/userRegister", userController.userController.registerUser)

userRoute.post("/loginUser", userController.userController.loginUser)

userRoute.get("/getUser", UserAuthorization.userAuth, userController.userController.getUserBYId)

userRoute.put("/updateUser", UserAuthorization.userAuth, userController.userController.updateUser)

export default userRoute