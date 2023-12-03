import express from 'express'
import invoiveRouter from './invoiceRouter'

const router = express.Router();

router.use('/invoice',invoiveRouter)
export default router;