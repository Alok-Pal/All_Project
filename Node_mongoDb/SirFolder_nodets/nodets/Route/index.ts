import express from 'express';
const router = express.Router();
import invoiceRoute from './invoiceRoute';

router.use('/invoice',invoiceRoute);
export default router;
