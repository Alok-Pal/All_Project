import { Request, Response } from "express";
import commentRepo from "../../repository";
import { CommentsModal } from "../../modal/commentsModal/commentsModal";
import { Responsemodal } from "../../modal/responseModal";


let responseModal = new Responsemodal()
class CommentsController {
    async getCommentsData(req: Request, res: Response) {
        try {
            const data = await commentRepo.commentRepo.getRepo()
            responseModal.message = "Data get Successsfully"
            responseModal.status = 200
            responseModal.data = data;
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

    async postCommentsData(req: Request, res: Response) {
        try {
            const commentsModal: CommentsModal = {

                commentsText: req.body.commentsText,
                postId: req.body.postId,
                userId: req.body.userId

            }

            const data = await commentRepo.commentRepo.postRepo(commentsModal)
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


    async updateCommentsData(req: Request, res: Response) {
        try {
            const itemToUpdate = req.params.id

            const dataToUpdate: CommentsModal = {
                commentsText: req.body.commentsText,
                postId: req.body.postId,
                userId: req.body.userId
            }

            const data = await commentRepo.commentRepo.updateComments(itemToUpdate, dataToUpdate)
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

    async deleteCommentsData(req: Request, res: Response) {
        console.log("delete User")
        try {
            const itemToDelete = req.params.id
            const data = await commentRepo.commentRepo.deleteComments(itemToDelete)

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

    async getSearching(req: Request, res: Response) {
        try {
            const itemToSearch = (req.query.search)
            console.log(itemToSearch as unknown)
            const data = await commentRepo.commentRepo.searchingComments(itemToSearch)
            responseModal.message = "Data searched Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)


        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not searched"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }
}

export default new CommentsController()