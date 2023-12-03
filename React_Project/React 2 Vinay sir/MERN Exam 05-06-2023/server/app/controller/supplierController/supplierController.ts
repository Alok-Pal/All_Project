import { Request, Response } from "express";
import supplierRepo from "../../repository";
import { Responsemodal } from "../../modal/responseModal/responseModal";
import nodemailer from "nodemailer"
import axios from 'axios';

let responseModal = new Responsemodal()
class SupplierController {

    async getSupplier(req: Request, res: Response) {
        const month = req.query.month

        console.log("qwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", month)
        try {
            let response = await supplierRepo.supplierRepo.getAllSupplier(month)
            responseModal.status = 200
            responseModal.message = "User found"
            responseModal.data = response
            res.status(200).json(responseModal)

        } catch (error) {
            responseModal.message = "User not found"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error);
        }
    }


    async postInvoice(req: Request, res: Response) {
        console.log("Runninnnn1");

        const data = req.body.map((obj: any) => ({
            supplierId: obj.Sup_id,
            field1: parseInt(obj.field1),
            field2: parseInt(obj.field2),
            field3: parseInt(obj.field3),
            field4: parseInt(obj.field4),
            field5: parseInt(obj.field5),
            field6: parseInt(obj.field6),
            field7: parseInt(obj.field7),
            field8: parseInt(obj.field8),
            field9: parseInt(obj.field9),
            field10: parseInt(obj.field10),
            field11: parseInt(obj.field11),
            Net: parseInt(obj.Net),
            Vat: parseInt(obj.Vat),
            Advance: parseInt(obj.Advance),
            Balance: parseInt(obj.Balance),
            month: obj.month,
            isApproved: obj.isApproved,
            isChkBox: obj.isChkBox,

        }));

        console.log("data ackend==========================<>", data);


        try {

            const response = await supplierRepo.supplierRepo.postInvoice(data)
            responseModal.status = 200
            responseModal.message = "Invoice Created successfully"
            responseModal.data = response
            res.status(200).json(responseModal)
        } catch (error) {
            responseModal.message = "Invoice not Created"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)
        }
    }

    async updateInvoices(req: Request, res: Response) {

        let invoiceData = req.body; // Assuming the data is in req.body
        console.log("🚀 ~ file: supplierController.ts:76 ~ SupplierController ~ updateInvoices ~ invoiceData:", invoiceData)



        try {

            const inData = invoiceData.map((obj: any) => ({
                supplierId: obj.Sup_id,
                field1: parseInt(obj.field1),
                field2: parseInt(obj.field2),
                field3: parseInt(obj.field3),
                field4: parseInt(obj.field4),
                field5: parseInt(obj.field5),
                field6: parseInt(obj.field6),
                field7: parseInt(obj.field7),
                field8: parseInt(obj.field8),
                field9: parseInt(obj.field9),
                field10: parseInt(obj.field10),
                field11: parseInt(obj.field11),
                Net: parseInt(obj.Net),
                Vat: parseInt(obj.Vat),
                Advance: parseInt(obj.Advance),
                Balance: parseInt(obj.Balance),
                month: obj.month,
                isApproved: obj.isApproved,
                id: obj.invoiceId,
                isChkBox: obj.isChkBox,
            }));

            console.log("IN loooooooooooooooo", inData);
            const response = await supplierRepo.supplierRepo.updateInvoices(inData)
            console.log("12111111111111111111111111111111111111111111111111111111111111111111", response);
            responseModal.status = 200
            responseModal.message = "Invoice Updated successfully"
            responseModal.data = response
            res.send(response)
        } catch (error) {
            responseModal.message = "Invoice not Updated"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
        }
    }

    async sendEmail(req: Request, res: Response) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alokpal28071997@gmail.com',
                pass: 'plsgrpfyfkrcobef'
            }
        });

        const sub = req.body
        console.log("🚀 ~ file: supplierController.ts:133 ~ SupplierController ~ sendEmail ~ sub:", sub)

        const filteredData = sub.filter((item: any) => item.isChkBox);
        console.log("🚀 ~ file: supplierController.ts:136 ~ SupplierController ~ sendEmail ~ filteredData:", filteredData)


        const extractedData = filteredData.map((item: any) => {
            return {
                supplierName: item.SupplierName,
                net: item.Net,
                vat: '20%' ,
                balance: item.Balance
            };
        });

        console.log(extractedData);



        var mailOptions = {
            from: 'alokpal28071997@gmail.com',
            to: "rahulvy4228@gmail.com",
            subject: "Supplier Data",

            text: "hello world",
            html: `
            <div style="padding:10px;border-style: ridge">
            <p>Name and Email of Suppliers.</p>
            <h3>Contact Details</h3>
            <ul>
                <li>Email:"rahulvy4228@gmail.com" </li>
                <li>Subject: Supplier Data</li>
                <li>Message: Here are all Suppliers name </li>
                ${extractedData
                    .map(
                      (item:any) => `
                    <li>
                      Supplier Name: ${item.supplierName}
                      <ul>
                        <li>Net: ${item.net}</li>
                        <li>Vat: ${item.vat}</li>
                        <li>Balance: ${item.balance}</li>
                      </ul>
                    </li>
                  `
                    )
                    .join('')}
            </ul>
            `
        };
        console.log("🚀 ~ file: supplierController.ts:149 ~ SupplierController ~ sendEmail ~ mailOptions:", mailOptions)

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({ status: true, respMesg: 'Email Sent Successfully' })
            }
            else {
                res.json({ status: true, respMesg: 'Email Sent Successfully' })
            }

        });
    }


    async downloadPdf(req: Request, res: Response) {

        let data = req.body;
        // console.log("🚀 ~ file: supplierController.ts:164 ~ SupplierController ~ downloadPdf ~ data:", data)


        const filteredData = data.filter((item: any) => item.isChkBox);
        console.log("🚀 ~ file: supplierController.ts:168 ~ SupplierController ~ downloadPdf ~ filteredData:", filteredData);

        let htmlArray: any = [];

        const html = filteredData.map((item: any) => {
            let tableRows = '';


            if (item.Net !== 0) {
                tableRows += `<tr><td>Net</td><td>${item.Net}</td></tr>`;
            }
            if (item.Vat !== 0) {
                tableRows += `<tr><td>Vat</td><td>${item.Vat}</td></tr>`;
            }
            if (item.Advance !== 0) {
                tableRows += `<tr><td>Advance</td><td>${item.Advance}</td></tr>`;
            }
            if (item.Balance !== 0) {
                tableRows += `<tr><td>Balance</td><td>${item.Balance}</td></tr>`;
            }
            if (item.field1 !== 0) {
                tableRows += `<tr><td>Field 1</td><td>${item.field1}</td></tr>`;
            }
            if (item.field2 !== 0) {
                tableRows += `<tr><td>Field 2</td><td>${item.field2}</td></tr>`;
            }
            if (item.field3 !== 0) {
                tableRows += `<tr><td>Field 3</td><td>${item.field3}</td></tr>`;
            }
            if (item.field4 !== 0) {
                tableRows += `<tr><td>Field 4</td><td>${item.field4}</td></tr>`;
            }
            if (item.field5 !== 0) {
                tableRows += `<tr><td>Field 5</td><td>${item.field5}</td></tr>`;
            }
            if (item.field6 !== 0) {
                tableRows += `<tr><td>Field 6</td><td>${item.field6}</td></tr>`;
            }
            if (item.field7 !== 0) {
                tableRows += `<tr><td>Field 7</td><td>${item.field7}</td></tr>`;
            }
            if (item.field8 !== 0) {
                tableRows += `<tr><td>Field 8</td><td>${item.field8}</td></tr>`;
            }
            if (item.field9 !== 0) {
                tableRows += `<tr><td>Field 9</td><td>${item.field9}</td></tr>`;
            }
            if (item.field10 !== 0) {
                tableRows += `<tr><td>Field 10</td><td>${item.field10}</td></tr>`;
            }
            if (item.field11 !== 0) {
                tableRows += `<tr><td>Field 11</td><td>${item.field11}</td></tr>`;
            }

            const htmldata = `<style>
             
                body {
                  font-family: Arial, sans-serif;
                }
                .invoice-container {
                  text-align: center;
                }
                .supplier-info {
                  text-align: start;
                  margin-top: 20px;
                }
                .table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                .table th,
                .table td {
                  padding: 10px;
                  text-align: left;
                  border-bottom: 1px solid #ccc;
                }
                .table th {
                  font-weight: bold;
                }
              </style>
              </head>
              <body>
                <div class="invoice-container">
                  <h1>Invoice</h1>
                </div>
                
                <div class="supplier-info">
                  <p>Supplier: ${item.SupplierName}</p>
                  <p>Invoice No.: ${item.invoiceId}</p>
                  <p>Date: ${item.month}</p>
                </div>
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableRows}
                  </tbody>
                </table>
              
                <p>Thank you for your business!</p>
              </body>`;



            htmlArray.push(htmldata)
        });

        console.log(htmlArray);


        // removing backshsh \n
        const formattedHtml = htmlArray.map((item: any) => item.replace(/\n/g, ''));

        console.log(formattedHtml);


        // converting in base 64
        const base64Array = formattedHtml.map((htmlString: any) => btoa(htmlString));

        console.log(base64Array);

        let objToSendPdf = {
            "FileName": "Alok.pdf",
            "HtmlData": base64Array
        }

        console.log("objToSendPdf",objToSendPdf);
        // const response = await axios.post('https://pdf.satvasolutions.com/api/ConvertHtmlToPdf', objToSendPdf);
        // console.log(response.data);

        // // send to front end
        // res.send(response.data);

    }
}

export default new SupplierController()