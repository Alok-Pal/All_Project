
// import express ,{ Request,Response } from "express";
import { responseModel } from "../Model/responseModel";
import { InvoiceInterface } from "Interface/invoiceInterface";
import {InvoiceModel} from '../Model/invoiceModel';

class InvoiceController
{
    Get(req:Request, res:Response)
    {
        let response = new responseModel();
        try{
            response.status = 200
            response.message="Invoice Get Successfully";
            response.data = "{}"
        }
        catch(ex:any){
            response.status = 400
            response.message=ex.message;
        }
        res.send(response);
    }

    Save(req:Request, res:Response){
        let response = new responseModel();

        var Invoice = { Invoices:[{id:1, No:"1212",Customer:"shailesh"},{id:2, No:"1212212",Customer:"Satva"}] }

        var ObjInvoices = new InvoiceModel();
        // var ObjInvoice = new Invoice();

        // ObjInvoices.Invoices.push()
        // ObjInvoice.id = Invoice.Invoices[0].id;
        // ObjInvoice.No =  parseInt(Invoice.Invoices[0].No);
        // ObjInvoice.CustomerName = Invoice.Invoices[0].Customer;

        //console.log("ObjInvoice",ObjInvoice);

        let InvoiceInter:InvoiceInterface = Invoice;

        try{
            response.status = 200
            response.message="Invoice Save Successfully";
            response.data = req.body;
        }
        catch(ex:any){
            response.status = 400
            response.message=ex.message;
        }        
        res.send(response);

        //res.send("Invoice Save Method");
    }

}
export default new InvoiceController();