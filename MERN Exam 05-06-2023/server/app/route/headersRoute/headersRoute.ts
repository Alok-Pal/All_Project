import express from "express"
import headersController from "../../controller"


const headersRoute = express()

headersRoute.get('/getheader/:month',headersController.headersController.getHeaders)
headersRoute.post('/postheader',headersController.headersController.postHeader)
headersRoute.put('/updateheader/:id',headersController.headersController.updateHeader)


export default headersRoute