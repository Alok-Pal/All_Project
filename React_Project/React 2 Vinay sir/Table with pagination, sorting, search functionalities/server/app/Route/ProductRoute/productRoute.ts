import express from 'express';
import productController from '../../Controller';
import productSchemaValidation from '../../Middleware/Product/productSchemaValidation';
import multer from 'multer'
import { upload } from '../../Middleware/Multer/Multer';

const productRoute = express()



productRoute.post('/createProduct', upload.single('File'), productController.productController.postProduct)

productRoute.get('/getProduct', productController.productController.getProduct)


productRoute.delete('/deleteProduct', productController.productController.deleteProduct)

productRoute.get('/searchSortPaginate', productController.productController.searchingSortingPagination)

export default productRoute