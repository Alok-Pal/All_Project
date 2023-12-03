import { Request, Response } from "express";
import drugrepo from "../../repository/index"
import { DrugModel } from "../../modal/drugModel";
import { Responsemodal } from "../../modal/responseModal";

let responseModal = new Responsemodal
class DrugController {
    async getData(req: Request, res: Response) {
        console.log("get running")

        try {
            let getDrugs = await drugrepo.drugsRepository.getDrug()
            responseModal.message = "Data get successfully"
            responseModal.status = 200
            responseModal.data = getDrugs

            res.send(responseModal)

        } catch (error) {
            responseModal.message = "No data found"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }

    }

    async postData(req: Request, res: Response) {

        console.log("post")
        try {
            const drugModal: DrugModel =
            {
                drugName: req.body.drug_name,
                qty: req.body.qty,
                manufacturer: req.body.manufacturer,
                price: req.body.price
            }

            let pData = await drugrepo.drugsRepository.postDrug(drugModal)
            responseModal.message = "Data post successfully"
            responseModal.status = 200
            responseModal.data = pData
            res.send(responseModal)

        } catch (error) {
            responseModal.message = "data is not Posted"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    async updateDrug(req: Request, res: Response) {
        console.log("update is running")
        let itemToUpdate = req.params.id
        console.log(itemToUpdate);
        try {
            const updateUser = await drugrepo.drugsRepository.putDrug(itemToUpdate, {
                drug_name: req.body.drug_name,
                qty: req.body.qty,
                manufacturer: req.body.manufacturer,
                price: req.body.price
            });


            responseModal.message = "Data Updated successfully"
            responseModal.status = 200
            responseModal.data = updateUser

            res.send(responseModal)
        } catch (error) {
            responseModal.message = "No data updated"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }

    async deleteUser(req: Request, res: Response) {
        console.log("delete user ")
        const itemtodelete = req.params.id
        console.log(itemtodelete)
        try {
            let deleteUser = await drugrepo.drugsRepository.deleteUser(itemtodelete)

            responseModal.message = "Data deleted successfully"
            responseModal.status = 200
            responseModal.data = deleteUser
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "No data deleted"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }

    async sortData(req: Request, res: Response) {


        try {
            let getDrugs = await drugrepo.drugsRepository.sort(req.params.sortBy)
            responseModal.message = "Data sort successfully"
            responseModal.status = 200
            responseModal.data = getDrugs

            res.send(responseModal)

        } catch (error) {
            responseModal.message = "No data sorted"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }

    }

    async searchData(req: Request, res: Response) {
        console.log("search running")
    
         console.log(req.query);
        // const { name, age } = req.query;

        try {
            let getDrugs = await drugrepo.drugsRepository.search(req.query.search)
            responseModal.message = "Data sort successfully"
            responseModal.status = 200
            responseModal.data = getDrugs

            res.send(responseModal)

        } catch (error) {
            responseModal.message = "No data sorted"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }

    }

    async filterData(req: Request, res: Response) {
        console.log("filter running")
        let itemToFilter = req.query.filter
        try {
            let getDrugs = await drugrepo.drugsRepository.filter(itemToFilter)
            responseModal.message = "Data sort successfully"
            responseModal.status = 200
            responseModal.data = getDrugs

            res.send(responseModal)

        } catch (error) {
            responseModal.message = "No data sorted"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }

    }
}

export default new DrugController()