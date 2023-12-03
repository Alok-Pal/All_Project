import express from "express"
import invoiceEditController from "../Controller/invoiceEditController"

const editRouter = express.Router();
editRouter.put('/editInvoice/:id',invoiceEditController.editInvoice)

export default editRouter;
