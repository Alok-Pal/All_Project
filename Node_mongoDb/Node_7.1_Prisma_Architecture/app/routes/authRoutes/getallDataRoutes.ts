import express from "express"
import getcontroller from "../../controller/index"

const getAllDataRouter = express.Router();
getAllDataRouter.get("/getData", getcontroller.getController.getData)
getAllDataRouter.post("/postData", getcontroller.getController.postData)

export default getAllDataRouter;