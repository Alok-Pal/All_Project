import { Request, Response } from "express-serve-static-core"
import authRepository from "../../repository/index"
import { Responsemodal } from "../../modal/responseModal";
import { UserModal } from "../../modal/userModal";

let responseModal = new Responsemodal
class UserDataManipulation {
    async getUser(req: Request, res: Response) {
        console.log("app is running")
        try {
            let getuser = await authRepository.userRepository.getrepo()
            responseModal.message = "Data get successfully"
            responseModal.status = 200
            responseModal.data = getuser

            res.send(responseModal)

        } catch (error) {
            responseModal.message = "No data found"
            responseModal.status = 400
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }

    async saveUser(req: Request, res: Response) {
        console.log("Post is working")
        console.log(typeof(req.body.name))
        if (req.body.name != " " || req.body.email != '' || req.body.password != '') {
            console.log("hello")
            console.log(req.body);

            const userModal: UserModal = {
                name: req.body.name,
                email: req.body.email,
                drug : req.body.drug_id,
                invoice: req.body.Invoice_id
                // password: req.body.password
            }

            try {
                let postuser = await authRepository.userRepository.postRepo(userModal)
                responseModal.message = "Data post successfully"
                responseModal.status = 200
                responseModal.data = postuser
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
        else{
            res.send("All fields are required")
        }
    }

    async updateUser(req: Request, res: Response) {
        console.log("update is running")
        let itemToUpdate = req.params.id
        try {
            const updateUser = await authRepository.userRepository.putUser(itemToUpdate, {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
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


        try {
            let deleteUser = await authRepository.userRepository.deleteUser(itemtodelete)

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
}

export default new UserDataManipulation();