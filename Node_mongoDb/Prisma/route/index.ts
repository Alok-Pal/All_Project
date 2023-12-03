import express from "express";
import routerInvoice from "./invoiceRouter";
import postRouter from "./invoicePostRouter";
import editRouter from "./invoiceeditRoute";
import deleteRouter from "./invoiceDeleteRouter";


const router = express.Router()

router.use('/invoice', routerInvoice)
router.use('/invoice', postRouter)
router.use('/invoice', editRouter)
router.use('/invoice', deleteRouter)


export default router;