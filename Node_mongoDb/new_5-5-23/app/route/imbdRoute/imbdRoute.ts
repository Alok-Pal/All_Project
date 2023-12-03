import express from "express"
import imbdController from "../../controller/index"

const imbdRoute = express.Router();
imbdRoute.get("/getImbdData",imbdController.imbdController.getData)
imbdRoute.post("/postData",imbdController.imbdController.postData)

export default imbdRoute
