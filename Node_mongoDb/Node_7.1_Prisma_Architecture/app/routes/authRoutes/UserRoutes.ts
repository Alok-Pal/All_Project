import express from "express"
import userController from "../../controller/User_Controllers/userController"


const UserRoutes = express.Router();
UserRoutes.get("/getUser",userController.getUser)
UserRoutes.post("/postUser",userController.saveUser)
UserRoutes.put("/putUser/:id",userController.updateUser)
UserRoutes.delete("/delete/:id", userController.deleteUser)

export default UserRoutes;
