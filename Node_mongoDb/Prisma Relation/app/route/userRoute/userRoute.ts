import express from "express"
import userController from "../../controller/index"

const userRouter = express.Router()
userRouter.get("/getData",userController.userController.getData)
userRouter.post("/postData", userController.userController.postData)

export default userRouter