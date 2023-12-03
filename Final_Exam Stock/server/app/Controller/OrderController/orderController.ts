import { Request, Response } from "express";
import { OrderModal } from "../../Modlel/OrderModel/OrderModal";
import orderrepo from "../../Repository/";
import { Responsemodal } from "../../Modlel/ResponseModal";

let responseModal = new Responsemodal()
class OrderController {
    async createOrder(req: Request, res: Response) {

        const orderModal: OrderModal = {
            customerName: req.body.CustomerName,
            orderQuantity:parseInt (req.body.orderQuantity),
            stockId: req.body.StockName
        }
        console.log("🚀 ~ file: orderController.ts:15 ~ OrderController ~ createOrder ~ orderModal:", orderModal)


        try {
            const response = await orderrepo.orderrepo.createOrder(orderModal)
            console.log("🚀 ~ file: orderController.ts:18 ~ OrderController ~ createOrder ~ response:", response)
            console.log("🚀 ~ file: stockController.ts:16 ~ StockController ~ postStock ~ response:", response)
            responseModal.status = 200
            responseModal.message = "Order Created successfully"
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "Order is not Created"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)

        }
    }


    async getOrder(req: Request, res: Response){
        try {

            const response = await orderrepo.orderrepo.getOrder()
            responseModal.status = 200
            responseModal.message = "Order get successfully"
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "Order is not found"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)
        }
    }


    async deleteOrder(req: Request, res: Response){
        const deleteid = req.params.id

        try {
            const response = await orderrepo.orderrepo.deleteOrder(deleteid)
            console.log("🚀 ~ file: orderController.ts:60 ~ OrderController ~ deleteOrder ~ response:", response)
            responseModal.status = 200
            responseModal.message = "Order deleted successfully"
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "Order is not deleted"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)
        }
    }


}

export default new OrderController()