import express from 'express'
import productRoute from './productRoute';
import invoiceRouter from './invoiceRoute';

const routers = express.Router();

routers.use('/product', productRoute);
routers.use('/productInvoice', invoiceRouter)


export default {
    routers
};