import { Request, Response } from 'express'
import { prisma } from '../prisma/index';
import { ResponseModel } from '../Model/responseModel';


class deleteData{
    async deleteInvoice(req:Request,res:Response){
        let modalResponse = new ResponseModel()
        try {
            console.log("delete Api is running", req.params.id);
          const userData =  await prisma.user.delete({where: {
                id: req.params.id
            }})

            // getting data from the data base
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
}
export default new deleteData()