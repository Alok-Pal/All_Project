import  Express  from "express";
import InvoiceController from "../Controller/InvoiceController";
const router = Express.Router();

router.get('/',InvoiceController.Get);
router.post('/save',InvoiceController.Save);

export default router;


