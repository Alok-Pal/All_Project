import { Request, Response } from 'express'
import { prisma } from '../prisma/index';
import { ResponseModel } from '../Model/responseModel';



class getInvoices {
    async getInvoice(req: Request, res: Response) {

        let resonseModal = new ResponseModel()

        try {
            console.log("Api running.............")

            const allUsers = await prisma.user.findMany()
            console.log(allUsers)
            
            resonseModal.message = "Data get SuccessFully"
            resonseModal.status = "200 ok"
            resonseModal.data = allUsers;
            res.send(resonseModal)

        } catch (error) {
            resonseModal.message = "Data is Not Set"
            resonseModal.status = "400 "
            
        }

      

    }
}

export default new getInvoices();