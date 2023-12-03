import prisma from "../../../prisma/index"
import { PostModal } from "../../model/postModal"


class PostRepo{
    async postData(postModal : PostModal){
        const data = await prisma.post.create({
            data:{
              article : postModal.article
              
            }
        })

        return data
    }
}

export default new PostRepo()