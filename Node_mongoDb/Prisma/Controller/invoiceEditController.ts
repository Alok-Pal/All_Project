import { Response, Request } from "express";
import { prisma } from "../prisma/index"
import { ResponseModel } from "../Model/responseModel"


class UpdateData {
    async editInvoice(req: Request, res: Response) {
        console.log("run")
        let modalResponse = new ResponseModel;

        try {
            const { name, email, password } = req.body;
            console.log(req.body);
            await prisma.user.update({
                where: {
                    id: req.params.id
                },
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });

            modalResponse.status = "200 ok";
            modalResponse.message = "Data updated successfully";
            modalResponse.data = req.body;

            res.send(modalResponse);

        } catch (error: any) {
            modalResponse.status = "400";
            modalResponse.message = "Data is not Updated !!";
            res.send(error.message)
        }
    }
}

export default new UpdateData()