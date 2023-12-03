import { Router } from "express";
import  ProductController  from "../Controller/ProductController";


const router = Router();

router.get('/getproduct',ProductController.getProduct);
router.post('/StoreProduct',ProductController.Save);

export default router;