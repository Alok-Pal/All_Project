import { Request, Response } from "express"
import { Responsemodal } from "../../modal/responseModal"
import getAllDataRepository from "../../repository/index"
import { GetAllDataFromDataBase } from "../../modal/getAllDataModal"
let responseModal = new Responsemodal
class GetAllData {
    async getData(req: Request, res: Response) {
        try {
            const data = await getAllDataRepository.getAllDataRepository.getdata()
            responseModal.message = "Data get Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not found"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }
    
    async postData(req: Request, res: Response) {
       console.log("yhgfdhdas")
        const getAll: GetAllDataFromDataBase = {
            UserDetails : req.body.userList
        }

        try {
            const data = await getAllDataRepository.getAllDataRepository.postData(getAll)
            responseModal.message = "Data posted Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not posted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }


}
export default new GetAllData()