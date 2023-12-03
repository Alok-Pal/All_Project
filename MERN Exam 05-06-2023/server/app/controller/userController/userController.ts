import { Request, Response } from "express";
import { LoginModal, UpdatUserModal, UserModal } from "../../modal/userModal/userModal";
import userRepo from "../../repository";
import { Responsemodal } from './../../modal/responseModal/responseModal';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()


let responseModal = new Responsemodal()

class UserController {

    async registerUser(req: Request, res: Response) {
        const user: UserModal = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        }

        try {
            user.password = await bcrypt.hash(user.password as string, 10)
            console.log(user.password);

            const response = await userRepo.userRepo.RegisterUser(user)
            console.log(response);

            responseModal.status = 200
            responseModal.message = "User register successfully"
            responseModal.data = response
            res.status(200).json(responseModal)


        } catch (error) {
            responseModal.status = 400
            responseModal.message = "User is not Registered"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    async loginUser(req: Request, res: Response) {

        let user: LoginModal = {
            email: req.body.email,
            password: req.body.password
        }

        try {

            const response = await userRepo.userRepo.LoginUser(user.email)
            console.log("🚀 `````````````````````````````````````` response:", response)

            if (!await bcrypt.compare(user.password, response[0]?.password)) {
                responseModal.status = 400
                responseModal.message = "Please check your credintials"
                responseModal.data = null
                res.status(400).send(responseModal)

            }
            else {
                user.id = response[0]?.id


                const token = jwt.sign(user, process.env.APP_KEY as string, { expiresIn: 7200 })
                console.log("🚀 ~ file: userController.ts:71 ~ UserController ~ loginUser ~ token:", token)

                responseModal.status = 200
                responseModal.message = "Login successfully"
                responseModal.data = { data: user, token: token }
                res.status(200).json(responseModal)

            }


        } catch (error) {
            responseModal.message = "Please Enter Correct Login Details"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
        }

    }



    async getUserBYId(req: Request, res: Response) {

        const id = req.params.id
        const idFromToken = (req as any).UId
        console.log("🚀 ~ file: userController.ts:95 ~ UserController ~ getUserBYId ~ chk:", idFromToken)
        try {

            const response = await userRepo.userRepo.getUserById(idFromToken)
            console.log("🚀 ~ file: userController.ts:100 ~ UserController ~ getUserBYID ~ response:", response)


            responseModal.status = 200
            responseModal.message = "User found"
            responseModal.data = response
            res.status(200).json(responseModal)
        } catch (error) {
            responseModal.message = "Please Enter Correct Login Details"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
            console.log(error)
        }
    }


    async updateUser(req: Request, res: Response) {
        const idFromToken = (req as any).UId
        const id = req.params.id
        const user: UpdatUserModal = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
        }

        try {
            const response = await userRepo.userRepo.UpdateUser(idFromToken, user)
            console.log("🚀 ~ file: userController.ts:130 ~ UserController ~ updateUser ~ response:", response)

            responseModal.status = 200
            responseModal.message = "User updated successfully"
            responseModal.data = response
            res.status(200).json(responseModal)

        } catch (error) {
            responseModal.status = 400
            responseModal.message = "User is not Registered"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }
}

export default new UserController();