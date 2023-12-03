import prisma from "../../../prisma";
import { CommentsModal } from "../../modal/commentsModal/commentsModal";


class CommentsRepo{
    async getRepo(){
        return await prisma.comments.findMany({
            select:{
                post:{
                    include:{
                        user:true
                    }
                },
                userId:true,

            }
            
        })
    }

    async postRepo(commentsData : CommentsModal ){
        console.log("Post running")
        return await prisma.comments.create({
            data:{
                commentsText: commentsData.commentsText,
                postId: commentsData.postId,
                userId: commentsData.userId
            }
        })
    }

    async updateComments(itemToUpdate:any, dataToUpdate:any){

        return await prisma.comments.update({
            where:{
                id:itemToUpdate
            },
            data:dataToUpdate
        })
    }

    async deleteComments(itemToDelete:any){
        return await prisma.comments.delete({
            where:{
                id:itemToDelete
            }
        })
    }
    async searchingComments(itemToSearch:any){
        return await prisma.comments.findMany({
            where:{
                commentsText:{
                    contains:itemToSearch
                }
            }
        })
    }
}
export default new CommentsRepo()