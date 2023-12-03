import  express  from "express";
import formController from "../../controller";

const formRoute = express()

formRoute.post('/postform', formController.formController.postFormDat )

export default formRoute
