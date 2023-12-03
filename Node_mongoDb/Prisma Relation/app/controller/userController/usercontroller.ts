import express from "express"
import { Request, Response } from "express"
import { Responsemodal } from "../../model/responseModel"
import userData from "../../repository/index"
import { UserModal } from "../../model/userModel"

let responseModal = new Responsemodal
class UserData {

    async getData(req: Request, res: Response,) {
        console.log("get running")
        try {
            const user = await userData.userRepo.getUserData()
            responseModal.message = "Data get successfully"
            responseModal.status = 200
            responseModal.data = user

            res.send(responseModal)
        } catch (error) {
            responseModal.message = "No data found"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            console.log(error)
            res.send(responseModal)
        }

    }

    async postData(req: Request, res: Response) {
        console.log("post runningqswds")

        const usermodal: UserModal = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            postId: req.body.postId
        }

        try {

            const postData = await userData.userRepo.postData(usermodal)
            responseModal.message = "Data get successfully"
            responseModal.status = 200
            responseModal.data = postData

            res.send(responseModal)
        } catch (error) {
            responseModal.message = "No data posted"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            console.log(error)
            res.send(responseModal)
        }
    }

}
export default new UserData()