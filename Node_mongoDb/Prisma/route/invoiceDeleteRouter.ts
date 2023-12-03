import express from "express"
import invoiceDeleteController from "../Controller/invoiceDeleteController"

const deleteRouter = express.Router();
deleteRouter.delete('/deleteInvoice/:id',invoiceDeleteController.deleteInvoice)

export default deleteRouter;
