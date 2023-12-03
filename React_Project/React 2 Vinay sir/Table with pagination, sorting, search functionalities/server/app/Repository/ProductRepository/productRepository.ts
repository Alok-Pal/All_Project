
import prisma from "../../../prisma";
import { CategoryModal, ProductModal } from "../../Model/ProductModal/productModal";


class ProductRepository {

    // Create a new Product
    async postProduct(productModal: ProductModal, categoryModal: CategoryModal) {

        const existingId = await prisma.category.findFirst({
            where: {
                categoryName: categoryModal.categoryName
            }, select: {
                id: true
            }
        })
        console.log("🚀 ~ file: productRepository.ts:23 ~ ProductRepository ~ postProduct ~ existingId:", existingId)

        if (existingId) {
            console.log("not empty already");
            const createProductWithExistingId = await prisma.product.create({
                data: {
                    image: productModal.image,
                    title: productModal.title,
                    description: productModal.description,
                    category_Id: existingId?.id
                }
            })

            console.log(createProductWithExistingId.id);

            const existingCategoryAddProductid = await prisma.category.update({
                where: {
                    id: existingId?.id,
                }, data: {
                    product_Id: {
                        push: createProductWithExistingId.id
                    }
                }
            })

            return existingCategoryAddProductid
        }
        else {
            console.log("idhr aaya hu");
            return await prisma.product.create({
                data: {
                    image: productModal.image,
                    title: productModal.title,
                    description: productModal.description,


                    category: {
                        create: {
                            categoryName: categoryModal.categoryName
                        }
                    }

                }
            })

        }
    }



    // Get product

    async getProduct() {
        return await prisma.product.findMany({

            include: {

                category: {
                    select: {
                        categoryName: true

                    }


                }
            }
        })
    }


    async deleteProduct(data: any) {
        try {
            console.log("🚀 ~ file: productRepository.ts:85 ~ ProductRepository ~ deleteProduct ~ data:", data);

            const deletePromises = data.map(async (item: any) => {
                console.log(item);
                return prisma.product.delete({

                    where: {
                        id: item,

                    },
                });
            });

            const response = await Promise.all(deletePromises);
            console.log("Items deleted successfully.", response);
            return response;
        } catch (error) {
            console.error("Error deleting items:", error);
            throw error;
        }
    }

    async countDocuments(){
        return await  prisma.product.count()
            
    }

    async sortingSearchingPagination(query: any) {
        return await prisma.product.findMany(query)
    }
}


export default new ProductRepository();