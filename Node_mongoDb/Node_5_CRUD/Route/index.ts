import express from 'express'
import Invoicerouter from './invoiceRouter'


const routers = express.Router();

routers.use('/invoice',Invoicerouter);

export default routers;