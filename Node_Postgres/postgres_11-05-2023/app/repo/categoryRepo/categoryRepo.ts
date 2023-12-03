import prisma from "../../../prisma";
import { CategoryModal } from "../../modal/categoryModal/categoryModal";
import { PostModal } from "../../modal/postModal/postModal";


class CategoryRepo {
    async postCategory(categoryModal: CategoryModal, postModal: PostModal) {
        return await prisma.category.create({
            data: {
                category: categoryModal.category,
                Post: {
                    create: [
                        {
                            title: postModal.title,
                            content: postModal.content,
                            published: postModal.published,
                            userId: postModal.userId
                        }
                    ]
                }
            }
        })
    }

    async getCategory(categoryId: number) {
    
        return await prisma.category.findMany({
            where:{
                id : categoryId
            },
            select:{
                Post:true
            }
        })
    }


    async UpdateCategory(categoryModal: CategoryModal, postModal:PostModal, UID : number){
        return await prisma.category.update({
            where: {
                id : UID
            },data :{
                category: categoryModal.category,
                Post: {
                    create: [
                        {
                            title: postModal.title,
                            content: postModal.content,
                            published: postModal.published,
                            userId: postModal.userId
                        }
                    ]
                } 
            }
        })

    }

    async deleteCategory(delteId : number){
        return prisma.category.delete({
            where:{
                id: delteId
            }
        })
    }
}

export default new CategoryRepo()
