import { CategoryModal } from "../../modal/categoryModal/categoryModal"
import { Responsemodal } from "../../modal/responseModal";
import categoryRepo from "../../repository"
import { Request, Response } from "express"


let responseModal = new Responsemodal
class CategoryController {

    async getCategoryData(req: Request, res: Response) {
        console.log("get category");
        try {
            const getData = await categoryRepo.categoryRepo.getCategoryData()

            responseModal.message = "Data found Successsfully"
            responseModal.status = 200
            responseModal.data = getData;
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not found"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }

    }

    async postCategoryData(req: Request, res: Response) {
        console.log("post category");

        try {
            const data: CategoryModal = {
                category: req.body.category,
                postId: req.body.postId
            }
            const postdata = await categoryRepo.categoryRepo.postCategoryData(data)

            responseModal.message = "Data posted Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not posted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }


    }



    async updataCategoryData(req: Request, res: Response) {
        try {
            const itemToUpdate = req.params.id

            const dataToUpdate: CategoryModal = {
                category: req.body.category,
                postId: req.body.postId
            }

            const data = await categoryRepo.categoryRepo.updateCategory(itemToUpdate, dataToUpdate)

            responseModal.message = "Data updated Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)

        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not updated"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }

    }

    async deleteCategoryData(req: Request, res: Response) {
        console.log("delete User")

        try {
            const itemToDelete = req.params.id
            const data = await categoryRepo.categoryRepo.deleteCategory(itemToDelete)
            responseModal.message = "Data deleted Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not deleted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }

    }

}

export default new CategoryController()

