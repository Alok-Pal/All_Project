import { Request, Response } from "express";
import CustomerRepository from "../repository";
import getEmails from "../senderMQ";

class CustomerController {
    //  post request
    async postCustomer(req: Request, res: Response) {

        const data = {
            Name: req.body.Name,
            email: req.body.email
        }
        try {

            const response = await CustomerRepository.CustomerRepository.postCustomer(data)
            console.log("🚀 ~ file: customerController.ts:10 ~ CustomerController ~ getCustomer ~ response:", response)
            res.status(200).json({ data: response })
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: error });
        }
    }


    //  get customer

    async getCustomer(req: Request, res: Response) {

        try {

            const response = await CustomerRepository.CustomerRepository.getCustomer()
            console.log("🚀 ~ file: customerController.ts:10 ~ CustomerController ~ getCustomer ~ response:", response)

            let emails: string[] = [];
            response.forEach((customer) => {
                if (customer.email) {
                    emails.push(customer.email);
                }
            });
            console.log("🚀 ~ file: customerController.ts:34 ~ CustomerController ~ getCustomer ~ emails:", emails)
            res.status(200).json({ data: response })
            getEmails(emails)

        } catch (error) {
            console.log(error);
            res.status(400).send({ error: error });
        }
    }
}

export default new CustomerController();