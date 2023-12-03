import express from "express"
import orderController from "../../Controller//"

const orderRoute  = express()

orderRoute.post('/createOrder', orderController.orderController.createOrder)

orderRoute.get('/getOrder', orderController.orderController.getOrder)

orderRoute.delete('/deleteOrder/:id', orderController.orderController.deleteOrder)




export default orderRoute