import { Request, Response } from "express";
import headersRepo from "../../repository";
import { Responsemodal } from "../../modal/responseModal/responseModal";

const responseModal = new Responsemodal()

class HeadersController {
    async getHeaders(req: Request, res: Response) {

        const month = req.params.month;

        try {

            const response = await headersRepo.headersRepo.getheaders(month)
            console.log(response);

            responseModal.status = 200
            responseModal.message = "Headers found"
            responseModal.data = response
            res.status(200).json(responseModal)



        } catch (error) {
            responseModal.message = "Headers not found"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error);
        }

    }

    async postHeader(req: Request, res: Response) {
        console.log("Runninnnn1");

        const data = req.body

        const headerdata = []
        headerdata.push({

            Custom1: data.Custom1,
            Custom2: data.Custom2,
            Custom3: data.Custom3,
            Custom4: data.Custom4,
            Custom5: data.Custom5,
            Custom6: data.Custom6,
            Custom7: data.Custom7,
            Custom8: data.Custom8,
            Custom9: data.Custom9,
            Custom10: data.Custom10,
            Custom11: data.Custom11,
            month : data.month
        })
        console.log(headerdata);

        console.log("data ackend==========================<>", data);


        try {

            const response = await headersRepo.headersRepo.postHeaders(headerdata[0])
            responseModal.status = 200
            responseModal.message = "Headers Created successfully"
            responseModal.data = response
            res.status(200).json(responseModal)
        } catch (error) {
            responseModal.message = "Headers not Created"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)
        }
    }

    async updateHeader(req: Request, res: Response){
        const data = req.body

        const headerdata = []
        headerdata.push({
            Custom1: data.Custom1,
            Custom2: data.Custom2,
            Custom3: data.Custom3,
            Custom4: data.Custom4,
            Custom5: data.Custom5,
            Custom6: data.Custom6,
            Custom7: data.Custom7,
            Custom8: data.Custom8,
            Custom9: data.Custom9,
            Custom10: data.Custom10,
            Custom11: data.Custom11,
            month : data.month
        })
        console.log(headerdata);

       const updateId = req.params.id
       console.log("🚀 ~ file: headersController.ts:98 ~ HeadersController ~ updateHeader ~ updateId:", updateId)

        console.log("data ackend==========================<>", data);
        try {

            const response = await headersRepo.headersRepo.putHeaders(headerdata[0],updateId)
            responseModal.status = 200
            responseModal.message = "Headers Update successfully"
            responseModal.data = response
            res.status(200).json(responseModal)
        } catch (error) {
            responseModal.message = "Headers not update"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)
        }
    }
}

export default new HeadersController()