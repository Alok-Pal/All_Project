import { Request, Response } from 'express';
import mongoDbData from '../dbConnects/Connection';
import mongoose from 'mongoose';
import userSchema from '../dbConnects/Schema';

mongoDbData();


class InvoiceContorller {

    async getInvoice(req: Request, res: Response) {
        console.log("Hello invoice api is running")
        const User = mongoose.model('test', userSchema);
        
        const userData = await User.find();

        res.send(userData)
    }

    saveInvoiceData(req: Request, res: Response) {
        // req.push(['Alok'])
        // console.log( req.push(['Alok']))
        console.log("aaasdsswe", req)
        res.send(req.body);

    }
}

export default new InvoiceContorller();