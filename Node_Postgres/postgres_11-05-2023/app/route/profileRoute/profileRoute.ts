import express from "express"
import auth  from "../../middleware/auth/authentication"
import profileController from "../../controller"

const profileRoute = express.Router()
profileRoute.post("/saveUser",auth.authentication, profileController.profileController.postProfile)
profileRoute.get("/getUser",auth.authentication, profileController.profileController.getProfile)
profileRoute.put("/updateProfile/:id", auth.authentication,profileController.profileController.updateProfile)
profileRoute.delete("/deleteProfile/:id",auth.authentication,profileController.profileController.deleteProfile)
export default profileRoute