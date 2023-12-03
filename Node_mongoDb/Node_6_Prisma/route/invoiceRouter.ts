import express from "express";
import invoiceRouter from "../controller/invoiceControllerGetApi"



const investApi = express.Router();

investApi.get('/getInvoice',invoiceRouter.getInvoice)

export default investApi;
