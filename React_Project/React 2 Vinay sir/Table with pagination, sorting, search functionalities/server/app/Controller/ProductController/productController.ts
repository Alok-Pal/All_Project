import express, { Request, Response, } from 'express';
import { Responsemodal } from '../../Model/ResponseModal/responseModal';
import yup, { string } from 'yup'
import { CategoryModal, ProductModal } from '../../Model/ProductModal/productModal';
import productRepository from '../../Repository';


let responseModal = new Responsemodal()
class ProductController {


    //  create product
    async postProduct(req: Request, res: Response) {

        const productModal: ProductModal = {
            image: req?.file?.path || 'images',
            title: req.body.title,
            description: req.body.Description,

        }

        const categoryModal: CategoryModal = {
            categoryName: req.body.Category,
        }
        console.log("🚀 ~ file: productController.ts:17 ~ ProductController ~ postProduct ~ productModal:", productModal)
        console.log("🚀 ~ file: productController.ts:21 ~ ProductController ~ postProduct ~ categoryModal:", categoryModal)
        // console.log(req?.file);

        try {

            const resp = await productRepository.productRepository.postProduct(productModal, categoryModal)
            console.log("🚀 ~ file: productController.ts:32 ~ ProductController ~ postProduct ~ res:", resp)

            responseModal.message = "Product Created successfully"
            responseModal.status = 200
            responseModal.data = resp

            res.send(responseModal)

        } catch (error) {
            responseModal.message = "Product is not created successfully"
            responseModal.status = 404
            responseModal.data = null
            responseModal.error = error
            console.log(error);
        }
    }


    // get product

    async getProduct(req: Request, res: Response) {
        try {

            const response = await productRepository.productRepository.getProduct()
            // console.log("🚀 ~ file: productController.ts:55 ~ ProductController ~ getProduct ~ response:", response)
            responseModal.message = "Product get successfully"
            responseModal.status = 200
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "Product get failed"
            responseModal.status = 404
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)

        }
    }

    // Delete product

    async deleteProduct(req: Request, res: Response) {
        const data = req.body
        console.log("🚀 ~ file: productController.ts:75 ~ ProductController ~ deleteProduct ~ data:", data)
        try {
            const response = await productRepository.productRepository.deleteProduct(data)
            console.log("🚀 ~ file: productController.ts:77 ~ ProductController ~ deleteProduct ~ response:", response)
            responseModal.message = "Product deleted successfully"
            responseModal.status = 200
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "Product get failed"
            responseModal.status = 404
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }

    // async searchingSortingPagination(req: Request, res: Response) {
    //     console.log("qwwwwwwwwwwwwwwww", req.body);
    //     // console.log(Object.keys(req.query));


    //     // Here i am getting values of both the entities value where i have to add filter and the values which i am addinf to filter ......  


    //     // For Filtering  
    //     const dynamicFilterField = req.query.dynamicFilterField as string  || ''
    //     console.log("🚀 ~ file: productController.ts:102 ~ ProductController ~ searchingSortingPagination ~ dynamicFilterField:", dynamicFilterField)
    //     const itemToFilter = req.query.itemToFilter   || ''
    //     console.log("🚀 ~ file: productController.ts:97 ~ ProductController ~ searchingSortingPagination ~ itemTofilter:", itemToFilter)


    //     // For   Searching
    //     // const dynamicSearchingField = req.query.dynamicSearchingField as string
    //     // const itemToSearch = req.query.itemToSearch
    //     // console.log("🚀 ~ file: productController.ts:109 ~ ProductController ~ searchingSortingPagination ~ itemToSearch:", itemToSearch)



    //     // For Sorting
    //     const dynamicSortField = req.query.dynamicSortField as string || ''
    //     console.log("🚀 ~ file: productController.ts:116 ~ ProductController ~ searchingSortingPagination ~ dynamicSortField:", dynamicSortField)
    //     const sortingWay = req.query.sortingWay || ''
    //     console.log("🚀 ~ file: productController.ts:116~ ProductController ~ searchingSortingPagination ~ sortingWay:", sortingWay)

    //     //  ITEMS PER PAGE
    //     const takeVal = req.query.takeVal || ''
    //     console.log("🚀 ~ file: productController.ts:121 ~ ProductController ~ searchingSortingPagination ~ takeVal:", takeVal)

    //     // ITEMS REQUIRE TO SKIP
    //     // const skipVal = req.query.skipVal
    //     // console.log("🚀 ~ file: productController.ts:124 ~ ProductController ~ searchingSortingPagination ~ skipVal:", skipVal)


    //     // Page on which page we are

    //     let pageVal = req.query.pageVal || 1
    //     console.log("🚀 ~ file: productController.ts:132 ~ ProductController ~ searchingSortingPagination ~ pageVal:", pageVal)



    //     try {
    //         //  this is the query
    //         const query = {
    //             where: {} || '',
    //             include: {} || '',
    //             orderBy: {} || '',
    //             take: parseInt(takeVal as any),
    //             skip: 0
    //         }
    //         // && dynamicSearchingField !== undefined



    //         query.where = {
    //             OR: [
    //                 {
    //                     [dynamicFilterField]: {
    //                         contains: itemToFilter,
    //                         mode: 'insensitive'
    //                     }

    //                 },
    //                 // {
    //                 //     [dynamicSearchingField]: {
    //                 //         contains: itemToSearch
    //                 //     }
    //                 // }

    //             ]
    //         }

    //         query.include = {

    //             category: {
    //                 select: {
    //                     categoryName: true

    //                 }


    //             }
    //         }
    //         query.orderBy = {
    //             [dynamicSortField]: sortingWay
    //         }

    //         query.take = parseInt(takeVal as any) || 5



    //         query.skip = ((pageVal as any) - 1) * (takeVal as any)


    //         const response = await productRepository.productRepository.sortingSearchingPagination(query)
    //         console.log("🚀 ~ file: productController.ts:117 ~ ProductController ~ c: 155151", response)


    //         //  to get the count of the data 
    //         const count = await productRepository.productRepository.countDocuments()
    //         console.log("🚀 ~ file: productController.ts:196 ~ ProductController ~ searchingSortingPagination ~ count:", count)

    //         // Page count 

    //         const pageCount = Math.ceil(count / parseInt(takeVal as any))
    //         console.log("🚀 ~ file: productController.ts:200 ~ ProductController ~ searchingSortingPagination ~ pageCount:", pageCount)



    //         res.send({ count, pageCount, response })



    //     } catch (error) {

    //     }


    // }
    async searchingSortingPagination(req: Request, res: Response) {
        console.log("qwwwwwwwwwwwwwwww", req.query.params);

        // For Filtering
        const dynamicFilterField = req.query.dynamicFilterField as string || '';
        console.log("🚀 ~ file: productController.ts:219 ~ ProductController ~ searchingSortingPagination ~ dynamicFilterField:", dynamicFilterField)
        const itemToFilter = req.query.itemToFilter || '';
        console.log("🚀 ~ file: productController.ts:221 ~ ProductController ~ searchingSortingPagination ~ itemToFilter:", itemToFilter)

        // For Sorting
        const dynamicSortField = req.query.dynamicSortField as string || '';
        console.log("🚀 ~ file: productController.ts:225 ~ ProductController ~ searchingSortingPagination ~ dynamicSortField:", dynamicSortField)
        const sortingWay = req.query.sortingWay || '';
        console.log("🚀 ~ file: productController.ts:227 ~ ProductController ~ searchingSortingPagination ~ sortingWay:", sortingWay)

        // ITEMS PER PAGE
        const takeVal = req.query.takeVal || 4;
        console.log("🚀 ~ file: productController.ts:231 ~ ProductController ~ searchingSortingPagination ~ takeVal:", takeVal)

        // Page on which page we are
        let pageVal = req.query.pageVal || 1;
        console.log("🚀 ~ file: productController.ts:235 ~ ProductController ~ searchingSortingPagination ~ pageVal:", pageVal)

        try {
            const query: any = {};

            if (dynamicFilterField && itemToFilter) {
                query.where = {
                    OR: [
                        {
                            [dynamicFilterField]: {
                                contains: itemToFilter,
                                mode: 'insensitive',
                            },
                        },
                    ],
                };
            }

            if (dynamicSortField && sortingWay) {
                query.orderBy = {
                    [dynamicSortField]: sortingWay,
                };
            }

            if (!takeVal && !pageVal) {
                // Retrieve all data
                query.take = undefined;
                query.skip = undefined;
            } else {
                query.take = parseInt(takeVal as string) ;
                query.skip = ((parseInt(pageVal as string)) - 1) * (parseInt(takeVal as string));
            }

            query.include = {

                category: {
                    select: {
                        categoryName: true

                    }


                }
            }
           
            const response = await productRepository.productRepository.sortingSearchingPagination(query);
            console.log("🚀 ~ file: productController.ts:117 ~ ProductController ~ c: 155151", response);

            // to get the count of the data
            const count = await productRepository.productRepository.countDocuments();
            console.log("🚀 ~ file: productController.ts:196 ~ ProductController ~ searchingSortingPagination ~ count:", count);

            // Page count
            const pageCount = Math.ceil(count / parseInt(takeVal as string));
            console.log("🚀 ~ file: productController.ts:200 ~ ProductController ~ searchingSortingPagination ~ pageCount:", pageCount);

            res.send({ count, pageCount, response });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    }


}

export default new ProductController()