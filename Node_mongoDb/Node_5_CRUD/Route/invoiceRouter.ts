import  express from 'express'
import invoiceController from '../Controller/invoiceController';

const invoiceRouter = express.Router();

invoiceRouter.get('/getInvoice', invoiceController.getInvoice)
invoiceRouter.post('/postInvoice', invoiceController.postInvoice)
invoiceRouter.delete('/deleteInvoice/:id',invoiceController.deleteInvoice)
invoiceRouter.put('/updateInvoice/:id',invoiceController.UpdateInvoice)


export default invoiceRouter
