import { Request, Response } from "express"
import { prisma } from "../prisma/index"
import { ResponseModel } from "../Model/responseModel"


class SignUp {
    async postInvoice(req: Request, res: Response) {

        const responseModal = new ResponseModel()

        try {
            console.log(req.body)
            const userData = await prisma.user.create({
                // data:{name:"alICHJDS",email:"dccvdvvfvfd",password:"21512"}
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
            })

            responseModal.message = "Data Posted successfully"
            responseModal.status = "200 ok"
            responseModal.data = userData

            res.send(responseModal)


        } catch (error: any) {
            responseModal.message = "Data is not Updated successfully"
            responseModal.status = "400"
            res.send(error.message)
        }


        // Send the new user data in the response

    }
}


export default new SignUp();