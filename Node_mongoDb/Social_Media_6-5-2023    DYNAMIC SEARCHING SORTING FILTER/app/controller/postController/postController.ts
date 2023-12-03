import { Request, Response } from "express";
import postRepo from "../../repository/index"
import { PostModal } from "../../modal/postModal/postModal";
import { Responsemodal } from "../../modal/responseModal";


let responseModal = new Responsemodal()
class PostsController {
    async getPostsData(req: Request, res: Response) {
        try {
            const data = await postRepo.postRepo.getPosts();
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

    async postPostsData(req: Request, res: Response) {
        console.log("Post post")
        try {

            const postModal: PostModal = {
                post_Desc: req.body.post_Desc,
                numberLikes: req.body.numberLikes,
                numberDisLikes: req.body.numberDisLikes,
                userId: req.body.userId,
                categoryID: req.body.categoryID

            }

            const postsData = await postRepo.postRepo.postPosts(postModal)
            responseModal.message = "Data posted Successsfully"
            responseModal.status = 200
            responseModal.data = postsData;
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


    async updataPostsData(req: Request, res: Response) {

        const itemToUpdate = req.params.id
        try {
            const dataToUpdate: PostModal = {
                post_Desc: req.body.post_Desc,
                numberLikes: req.body.numberLikes,
                numberDisLikes: req.body.numberDisLikes,
                userId: req.body.userId,
                categoryID: req.body.categoryID
            }

            const data = await postRepo.postRepo.updatePosts(itemToUpdate, dataToUpdate)

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

    async deletePostsData(req: Request, res: Response) {
        console.log("delete User")
        try {
            const itemToDelete = req.params.id
            const data = await postRepo.postRepo.deletePosts(itemToDelete)
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
            const data = await postRepo.postRepo.searchingPosts(itemToSearch)
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

export default new PostsController()