import { Request, Response } from "express";
import { UserModal } from "../../modal/UserModal/userRegisterModal";
import userRepo from "../../repo"
import { Responsemodal } from "../../modal/responseModal";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import { UserLoginModal } from "../../modal/UserModal/userLoginModal";


dotenv.config()

const responseModal = new Responsemodal;

class UserController {
    async registerUser(req: Request, res: Response) {

        try {
            const userModal: UserModal = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            }

            // encrypt password  and use await to get the data from the user
            userModal.password = await bcrypt.hash(userModal.password as string, 10)

            const UserCreated = await userRepo.userRepo.registerUser(userModal);

            // to create token and add th efields we want
            let userCreatedResponse = {
                id: UserCreated.id,
                email: UserCreated.email,
                password: UserCreated.password
            }
            const token = jwt.sign(userCreatedResponse, process.env.APP_KEY as string, { expiresIn: 3600 })

            // Response to user
            responseModal.message = "Data posted Successsfully"
            responseModal.status = 200
            responseModal.data = { User: UserCreated, Token: token }
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

    //------------------------------------------------------------------------------------------------------



    async userLogin(req: Request, res: Response) {
        console.log("login is ");
        try {
            const loginUserData: UserLoginModal = {
                email: req.body.email,
                password: req.body.password
            }
            console.log(loginUserData.email);
            console.log(loginUserData.password);


            const loginUserSearch = await userRepo.userRepo.userlogin(loginUserData.email);
            console.log(loginUserSearch);

            if (!bcrypt.compare(loginUserData.password, loginUserSearch?.password as string)) {
                console.log("gjuisdousddohewdf");
                responseModal.status = 400
                responseModal.message = "Please check your credintials"
                responseModal.data = null
                res.status(400).send(responseModal)
            }
            else {
                // this add id to the token which we can get at the time of authentication
                loginUserData.id = loginUserSearch?.id
                const token = jwt.sign(loginUserData, process.env.APP_KEY as string, { expiresIn: 3600 })
                console.log(token);
                // Response to user
                responseModal.message = "User Loggedin Successfully"
                responseModal.status = 200
                responseModal.data = { User: loginUserData, Token: token }
                responseModal.error = null
                res.send(responseModal)
            }

        } catch (error) {
            responseModal.message = "Please Enter Correct Login Details"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }

    //------------------------------------------------------------------------------------------------------


    async getUserData(req: Request, res: Response) {

        try {
            const Uid = (req as any).Uid

            const data = await userRepo.userRepo.getUser(Uid)
            responseModal.message = "User data found Successfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "User data not found"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }

    //------------------------------------------------------------------------------------------------------

    async updateUserData(req: Request, res: Response) {
        console.log("running");
        try {
            const updateId = req.params.id
            const userModal: UserModal = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            }

            const data = await userRepo.userRepo.updateUserData(userModal, parseInt(updateId))
            responseModal.message = "User data updated Successfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.message = "User data is not updated"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
        }
    }

    //------------------------------------------------------------------------------------------------------

    async deleteUser(req: Request, res: Response) {
        console.log("sdfdsf");
        try {
            console.log("delete runninng");
            const deleteId = req.params.id
            console.log(deleteId);
            const data = await userRepo.userRepo.deleteUser(parseInt(deleteId))
            responseModal.message = "Data deleted Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not deleted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }
}

export default new UserController()