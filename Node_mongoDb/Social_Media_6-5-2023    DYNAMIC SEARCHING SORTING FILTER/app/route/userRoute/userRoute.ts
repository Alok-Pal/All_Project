import express from "express"
import userController from "../../controller/index"


const userRoute = express.Router()
userRoute.get("/getUser", userController.userController.getData)
userRoute.post("/postUser",userController.userController.saveData)
userRoute.put("/putUser/:id",userController.userController.updateData)
userRoute.delete("/deleteUser/:id",userController.userController.deleteData)
userRoute.get("/sortSearchUser",userController.userController.getSortedSearch)
// userRoute.get("/searchingUser",userController.userController.getSearching)




export default  userRoute