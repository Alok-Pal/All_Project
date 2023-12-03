import express from "express"
import authentication from "../../middleware/auth/authentication"
import categoryController from "../../controller"


const categoryRoute = express.Router()
categoryRoute.post("/postCategory",authentication.authentication,categoryController.categoryController.postCategory)
categoryRoute.get("/getCategory", categoryController.categoryController.getCategory)
categoryRoute.put("/updateCategory",authentication.authentication,categoryController.categoryController.updateCategory)
categoryRoute.delete("/deleteCategory/:id", categoryController.categoryController.deleteCategory)

export default categoryRoute

