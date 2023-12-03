import { Request, Response } from "express"
import { CategoryModal } from "../../modal/categoryModal/categoryModal"
import { PostModal } from "../../modal/postModal/postModal"
import categoryRepo from "../../repo"
import { Responsemodal } from "../../modal/responseModal"


let responseModal = new Responsemodal()

class CategoryController {
    async postCategory(req: Request, res: Response) {

        try {

            const UID = (req as any).Uid

            const categoryModal: CategoryModal = {
                category: req.body.category
            }
            const postModal: PostModal = {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                userId: UID
            }

            const data = await categoryRepo.categoryRepo.postCategory(categoryModal, postModal)
            // Response to user
            responseModal.message = "Data posted Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not posted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    async getCategory(req: Request, res: Response) {
        try {

            const categoryId = req.query.id
            console.log(categoryId);

            const id = parseInt(categoryId as any);
            const data = await categoryRepo.categoryRepo.getCategory(id)
            responseModal.message = "Data get Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not found"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const categoryId = req.query.id
            console.log(categoryId);
            const id = parseInt(categoryId as any);


            const UID = (req as any).Uid


            const categoryModal: CategoryModal = {
                category: req.body.category
            }
            const postModal: PostModal = {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                userId: UID
            }

            const data = await categoryRepo.categoryRepo.UpdateCategory(categoryModal, postModal, id)
            responseModal.message = "Data updated Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not found"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    async deleteCategory(req: Request, res: Response) {
        console.log("running");
        try {

            const deleteId = req.params.id
            console.log(deleteId);
            const data = await categoryRepo.categoryRepo.deleteCategory(parseInt(deleteId))
            responseModal.message = "Data deleted Successsfully"
            responseModal.status = 200
            responseModal.data = data
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