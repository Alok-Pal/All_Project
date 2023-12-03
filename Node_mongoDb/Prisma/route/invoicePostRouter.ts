import express from "express"
import invoicePostControllers from "../Controller/invoicePostControllers"
const invoicePostRouter = express.Router()

invoicePostRouter.post('/postInvoice',invoicePostControllers.postInvoice);

export default invoicePostRouter;