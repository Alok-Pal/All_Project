import { Router } from "express";
import invoiceController from "../Controller/invoiceController";

const invoiceRouter = Router();

invoiceRouter.get('/getInvoice',invoiceController.getInvoice)
invoiceRouter.post('/saveInvoiceData', invoiceController.saveInvoiceData)

export default invoiceRouter;