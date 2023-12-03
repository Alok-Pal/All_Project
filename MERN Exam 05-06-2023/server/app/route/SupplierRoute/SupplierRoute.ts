import express from "express"
import supplierController from "../../controller"

const supplierRoute = express()
supplierRoute.get("/getAllUser", supplierController.supplierController.getSupplier)

supplierRoute.post("/postInvoice", supplierController.supplierController.postInvoice)

// supplierRoute.put("/updateInvoice/:month", supplierController.supplierController.updateInvoices)
supplierRoute.put("/updateInvoice", supplierController.supplierController.updateInvoices)

// emailPost

supplierRoute.post("/email", supplierController.supplierController.sendEmail)

// get pdf

supplierRoute.post("/pdf", supplierController.supplierController.downloadPdf)


export default supplierRoute