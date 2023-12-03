import express from "express"
import stockController from "../../Controller"


const stockRoute  = express()

stockRoute.post("/createStock", stockController.stockController.postStock)
stockRoute.get("/getStock", stockController.stockController.getStock)



export default stockRoute