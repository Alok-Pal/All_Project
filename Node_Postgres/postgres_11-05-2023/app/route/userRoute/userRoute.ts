import express from "express"
import userController from "../../controller"
import userValidation from "../../middleware/validations/validations"
import authUser from "../../middleware/auth/authentication"

const userRoute = express.Router();
userRoute.post("/registerUser" , userValidation.emailPasswordCheck,userController.userController.registerUser);
userRoute.post("/loginUser" ,userValidation.emailPasswordCheck,  userController.userController.userLogin);
userRoute.get("/getUser",authUser.authentication,userController.userController.getUserData)


//Update
userRoute.put("/updateUser/:id",authUser.authentication ,userController.userController.updateUserData)

// delete
userRoute.delete("/deleteUser/:id", authUser.authentication,userController.userController.deleteUser)
export default userRoute