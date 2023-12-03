import express from "express";
import invoiceController from "../Controller/invoiceController";


const routerInvoice = express.Router()
routerInvoice.get('/getInvoice',invoiceController.getInvoice)

export default routerInvoice;