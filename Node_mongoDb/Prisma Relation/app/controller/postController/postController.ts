import { Request, Response } from "express";
import { PostModal } from "../../model/postModal";
import postRepo from "../../repository/index";
import { Responsemodal } from "../../model/responseModel";

let responseModal = new Responsemodal
class PostsData {
    async postData(req: Request, res: Response) {
        console.log("Post is runnong")

        const post: PostModal = {
            article: req.body.article
        }

        try {
            const data = await postRepo.postRepo.postData(post)
            
            responseModal.message = "Data post successfully"
            responseModal.status = 200
            responseModal.data = data
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "data is not Posted"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }
}
export default new PostsData()
