import express from "express"
import userController  from "../../controller/index"

const UserRoute = express.Router()
UserRoute.get("/getData",userController.userController.getData)
UserRoute.post("/saveComments",userController.userController.postComments)
UserRoute.get("/getUserByComment",userController.userController.getUserByComment)

export default UserRoute