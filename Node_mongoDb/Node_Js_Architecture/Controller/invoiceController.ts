import { Request, Response } from 'express';
import mongoDbData from '../dbConnects/Connection';
import mongoose from 'mongoose';
import userSchema from '../dbConnects/Schema'
import fs from 'fs';
import { Root } from '../Interface/invoiceInerface';
import responseModel from '../Model/ResponseModel'
import jsonData from '../JsonData/Investment.json'
import User from '../dbConnects/schemaModel';

mongoDbData();


// getting data from the file

// fs.readFile("C:/Users/alokp/Downloads/Investment.json", 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     var  InvoiceJsonData =  JSON.parse(data.toString());
//     console.log(data);
//     // You can parse the data to a JavaScript object using JSON.parse() if needed
// });

class InvoiceContorller {

    async getInvoice(req: Request, res: Response) {
        console.log("Hello invoice api is running")

        const User = mongoose.model('customer_details', userSchema);
        const userData = await User.find()
        res.send(userData)




        console.log(userData)



    }

    saveInvoiceData(req: Request, res: Response) {
        // res.json(req.body); // Get the data from the request body
        // Data from file
        // const rawData = fs.readFileSync("C:/Users/alokp/Downloads/Investment.json");
        // var myData = JSON.parse(rawData.toString());
        // InvoiceJsonData;

        // import
        const myData = jsonData;
        console.log(myData)

        let invoiceInterface: Root = myData;

        console.log(" ")
        console.log("DATA")
        console.log(" ")
        console.log(invoiceInterface._id)
        console.log(invoiceInterface.InvestmentType)
        console.log(invoiceInterface.CompanyName)
        console.log(invoiceInterface.RepName)
        console.log(invoiceInterface.RepId)
        console.log(invoiceInterface.ProductServices.Name)
        console.log(invoiceInterface.ProductServices._id)
        console.log(invoiceInterface.Class.Name)
        console.log(invoiceInterface.Class._id)

        console.log(invoiceInterface.Program.Name)
        console.log(invoiceInterface.Program._id)

        console.log(invoiceInterface.Description)

        // res.send(myData)
        let response = new responseModel();
        try {
            response.status = 200
            response.message = "Invoice Save Successfully";
            response.data = myData;

            const newDocument = new User(req.body);
            newDocument.save();

            // let data = mongoDbData()
            // console.log(data)
        }
        catch (ex: any) {
            response.status = 400
            response.message = ex.message;
        }
        res.send(response);

        console.log(req.body)
    }
}

export default new InvoiceContorller();