import { Request, Response } from "express";
import { StockModal } from "../../Modlel/StockModel/StockModel";
import stockRepo from "../../Repository";
import { Responsemodal } from "../../Modlel/ResponseModal";


let responseModal = new Responsemodal()

class StockController {
    async postStock(req: Request, res: Response) {
        const data = req.body
        console.log("🚀 ~ file: stockController.ts:12 ~ StockController ~ postStock ~ data:", data)
        const stockData: StockModal = {
            stockName: req.body.stockName,
            stockQuantity:parseInt (req.body.stockQuantity)
        }

        try {
            
            const response = await stockRepo.stockRepo.createStock(stockData)
            console.log("🚀 ~ file: stockController.ts:16 ~ StockController ~ postStock ~ response:", response)
            responseModal.status = 200
            responseModal.message = "Stock Created successfully"
            responseModal.data = response
            res.send(responseModal)

        } catch (error) {
            responseModal.message = "Stock is not Created"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)
        }
    }

    async getStock(req: Request, res: Response){
        try {

            const response = await stockRepo.stockRepo.getStock()
            responseModal.status = 200
            responseModal.message = "Stock get successfully"
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "Stock is not found"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)
        }
    }
}

export default new StockController()