import prisma from "../../../prisma"
import { CategoryModal } from "../../modal/categoryModal/categoryModal";

class CategoryRepo{
    async getCategoryData(){
        return await prisma.category.findMany();
    }

    async postCategoryData( categoryModal : CategoryModal){

        const data = await prisma.category.create({
            data:{
                category: categoryModal.category,
                postId:categoryModal.postId
            }
        })
        return data;
    }

    async updateCategory(itemToUpdate:any, dataToUpdate:any){

        return await prisma.category.update({
            where:{
                id:itemToUpdate
            },
            data:dataToUpdate
        })
    }

    async deleteCategory(itemToDelete:any){
        return await prisma.category.delete({
            where:{
                id:itemToDelete
            }
        })
    }
}

export default new CategoryRepo();