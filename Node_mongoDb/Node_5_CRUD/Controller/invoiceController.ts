import { Response, Request } from "express";
import mongoDbData from "../dbConnection/dbConnect";
import User from '../dbConnection/schemaModel'
import { ResponseModal } from "../Modal/responseModal";



mongoDbData();

const modalResponse = new ResponseModal();

class InvoiceController {

    async getInvoice(req: Request, res: Response,) {

        try {
            console.log("Get Api is running")
            // const userData = await User.find()

            // 1. Lookup
            // const CustomerRelationalData = await User.aggregate([
            //     {
            //       $lookup: {
            //         from: "invoices",
            //         localField: "Invoice_id",
            //         foreignField: "_id",
            //         as: "Invoice_Details"
            //       }
            //     },
            //     {
            //       $unwind: "$Invoice_Details"
            //     },
            //     {
            //       $lookup: {
            //         from: "companynames",
            //         localField: "Invoice_Details.Company_id",
            //         foreignField: "Org_id",
            //         as: "CompanyDetails"
            //       }
            //     }
            //   ]);

            // 2. lookup in whole data
            // const CustomerCompanyData = await User.aggregate([
            //     {
            //         $lookup: {
            //             from: "companynames",
            //             localField: "Company_id",
            //             foreignField: "_id",
            //             as: "Company_Details"
            //         }
            //     }, {
                    // Here i have passsed the company id which is in the employee details collection thats y we are getting all the employees who are in that company.
            //         $lookup: {
            //             from: "employees_details",
            //             localField: "Employee_id",
            //             foreignField: "_id",
            //             as: "Employees_Details"
            //         }
            //     },
            //     {

            //         $lookup: {
            //             from: "customer_details",
            //             localField: "Customer_id",
            //             foreignField: "_id",
            //             as: "Customer_Details"
            //         }
            //     },
            //     {

            //         $lookup: {
            //             from: "invoices",
            //             localField: "Customer_Invoices_id",
            //             foreignField: "_id",
            //             as: "Invoices_Details"
            //         }
            //     }
            //     , {
            //         $project: {
            //             "Company_Details": 1,
            //             "Employees_Details": 1,
            //             "Customer_Details": 1,
            //             "Invoices_Details": 1
            //         }
            //     }

            // ]);

            // 3. lookup in customer with match
            // const CoustmerData = await User.aggregate([
            //     {
            //         $lookup: {
            //             from: "invoices",
            //             localField: "Invoice_id",
            //             foreignField: "_id",
            //             as: "Invoices_Details"
            //         }
            //     },
                // Greater than
                // {
                //     $match: {
                //         "Invoices_Details.Qty": { $gt: 50 }
                //     }
                // },
                // less than
                // {
                //     $match: {
                //         "Invoices_Details.Qty": { $lt: 50 }
                //     }
                // },
                // equal to
                // {
                //     $match: {
                //         "Invoices_Details.Qty": { $eq: 86 }
                //     }
                // }
                // Greater than equal to
                // {
                //     $match: {
                //         "Invoices_Details.Qty": { $ne: 86 }
                //     }
                // }
                // using AND
                // {
                //     $match: {

                //         $and:
                //             [
                //                 { "Invoices_Details.Qty": { $ne: 86 } },
                //                 { "Invoices_Details.Qty": { $lte: 50 } }
                //             ]
                //     }
                // }
                // using or
                //   {
                //     $match: {

                //         $or:
                //             [
                //                 { "Invoices_Details.Qty": { $ne: 86 } },
                //                 { "Invoices_Details.Qty": { $lte: 50 } }
                //             ]
                //     }
                // }

                // using nor
                // {
                //     $match: {

                //         $nor:
                //             [
                //                 { "Invoices_Details.Qty": { $ne: 86 } },
                //                 { "Invoices_Details.Qty": { $lte: 50 } }
                //             ]
                //     }
                // }

                // // using not
                // {
                //     $match: {

                //         $not:
                //             [
                //                 { "Invoices_Details.Qty": { $ne: 86 } },
                //                 { "Invoices_Details.Qty": { $lte: 50 } }
                //             ]
                //     }
                // }

                // $exists

                
            // ])

            const testData = await User.find();




            modalResponse.status = "200 ok"
            modalResponse.message = "Data get successfully"
            modalResponse.data = testData

            res.send(modalResponse);

        } catch (ex: any) {
            ex.message
            modalResponse.status = "400"
            modalResponse.message = "No data found"
            res.send(modalResponse);
        }



    }
    postInvoice(req: Request, res: Response) {
        try {
            console.log("Status Api is running");
            const postDocument = User.create(req.body);
            modalResponse.status = "200 ok"
            modalResponse.message = "Data added successfully"
            modalResponse.data = req.body
            res.send(modalResponse);

        } catch (ex: any) {
            ex.message
            modalResponse.status = "400"
            modalResponse.message = "Data is not added"
            res.send(modalResponse);
        }
    }

    async deleteInvoice(req: Request, res: Response) {
        try {
            console.log("delete Api is running", req.params.id);
            await User.deleteOne({ _id: req.params.id })

            // getting data from the data base
            const userData = await User.find()
            modalResponse.status = "200 ok"
            modalResponse.message = "Data deleted successfully"
            modalResponse.data = userData
            res.send(modalResponse);
        } catch (ex: any) {
            ex.message
            modalResponse.status = "400"
            modalResponse.message = "Data is not deleted"
            res.send(modalResponse);
        }
    }

    async UpdateInvoice(req: Request, res: Response) {
        try {
            console.log("Update Api is running", req.params.id);
            // const doc = await User.findById(req.params.id);
            // const updatedDoc = await doc?.updateOne(
            //     // { first_name:   req.body.first_name},
            //     { last_name: req.body.last_name }
            // );
            var updateId = { _id: req.params.id };
            var newvalues = { $set: req.body };
            console.log(newvalues)
            await User.updateOne({ _id: updateId }, newvalues, { new: true })
            // res.send(req.body)
            modalResponse.status = "200 ok"
            modalResponse.message = "Data updated successfully"
            modalResponse.data = req.body

            res.send(modalResponse);

        } catch (ex: any) {
            ex.message
            modalResponse.status = "400"
            modalResponse.message = "Data is not updated"
            res.send(modalResponse);
        }
    }
}

export default new InvoiceController();
