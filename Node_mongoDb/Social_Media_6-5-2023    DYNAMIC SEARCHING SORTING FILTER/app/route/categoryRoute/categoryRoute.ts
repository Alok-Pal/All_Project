import  express  from "express";
import categoryController from "../../controller";


const categoryRoute = express.Router()

categoryRoute.get("/getCategory", categoryController.categoryController.getCategoryData)
categoryRoute.post("/postCategory",categoryController.categoryController.postCategoryData)
categoryRoute.put("/updateCategory/:id",categoryController.categoryController.updataCategoryData)
categoryRoute.delete("/deleteCategory/:id",categoryController.categoryController.deleteCategoryData)

export default categoryRoute