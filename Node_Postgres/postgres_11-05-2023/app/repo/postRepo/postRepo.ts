import prisma from "../../../prisma"
import { CategoryModal } from "../../modal/categoryModal/categoryModal";
import { PostModal } from "../../modal/postModal/postModal";


class PostRepo {
    async savePosts(postModal: PostModal, categoryModal: CategoryModal) {
        return await prisma.post.create({
            data: {
                title: postModal.title,
                content: postModal.content,
                published: postModal.published,
                userId: postModal.userId,
                category: {
                    create: [{ category: categoryModal.category }, { category: categoryModal.category }, { category: categoryModal.category }]
                }
            },
        })
    }

    async getPosts(Uid: number) {
        return await prisma.post.findMany({
            where: {
                userId: Uid
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                category: true
            }
        })

    }

    async updatePost(userPostid: number, postModal: PostModal, categoryModal: CategoryModal) {

        return await prisma.post.update({
            where: {
                id: userPostid
            },
            data: {
                title: postModal.title,
                content: postModal.content,
                published: postModal.published,
                userId: postModal.userId,
                category: {
                    create: [{ category: categoryModal.category }, { category: categoryModal.category }, { category: categoryModal.category }]
                }
            }
        })

    }

    async deletePost(delteId: number) {
        return prisma.post.delete({
            where: {
                id: delteId
            }
        })
    }

    async searchingPosts(itemToSearch: any) {
        return await prisma.post.findMany({
            where: {
                title: {
                    contains: itemToSearch
                }

            }
        })
    }

    async filterPosts(itemToFilter: any) {
        
       console.log(itemToFilter);


        // console.log(published);
        return await prisma.post.findMany({
            where: {
                published: itemToFilter 


            }
        })
    }

    async sortPosts(itemToSort: any, UID: any) {
        return await prisma.post.findMany({
            where: {
                id: UID
            },
            orderBy: {
                content: itemToSort
            }
        })
    }
}
export default new PostRepo()