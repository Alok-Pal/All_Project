import  express  from "express";
import drugsController from "../../controller/index"


const drugRoute = express.Router();
drugRoute.get("/getDrug",drugsController.drugs_controller.getData)
drugRoute.post ("/postDrug", drugsController.drugs_controller.postData)
drugRoute.put("/putDrug/:id",drugsController.drugs_controller.updateDrug)
drugRoute.delete("/delete/:id",drugsController.drugs_controller.deleteUser)
drugRoute.get("/sortDrug/:sortBy",drugsController.drugs_controller.sortData)
drugRoute.get("/searchDrug",drugsController.drugs_controller.searchData)
drugRoute.get("/filterDrug",drugsController.drugs_controller.filterData)


export default drugRoute 