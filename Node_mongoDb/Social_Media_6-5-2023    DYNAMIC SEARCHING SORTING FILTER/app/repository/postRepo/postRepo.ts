import prisma from "../../../prisma";
import { PostModal } from "../../modal/postModal/postModal";

class PostsRepo {
    async getPosts() {
        return await prisma.post.findMany({
            select: {
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        });

    }
    async postPosts(postModal: PostModal) {
        return await prisma.post.create({
            data: {
                post_Desc: postModal.post_Desc,
                numberLikes: postModal.numberLikes,
                numberDisLikes: postModal.numberDisLikes,
                userId: postModal.userId,
                categoryID: postModal.categoryID

            }
        })
    }

    async updatePosts(itemToUpdate: any, dataToUpdate: any) {

        return await prisma.post.update({
            where: {
                id: itemToUpdate
            },
            data: dataToUpdate
        })
    }

    async deletePosts(itemToDelete: any) {
        return await prisma.post.delete({
            where: {
                id: itemToDelete
            }
        })
    }
    async searchingPosts(itemToSearch: any) {
        return await prisma.post.findMany({
            where: {
                numberLikes: {
                gte:parseInt(itemToSearch) 
                }
                
            }
        })
    }
}
export default new PostsRepo();