import prisma from "../../../prisma";


class CategoryRepo{
    async getCategory(){
        return  await prisma.category.findMany()
    }

    async postCategory(){
    //   return await prisma.category.create({})
    }
}