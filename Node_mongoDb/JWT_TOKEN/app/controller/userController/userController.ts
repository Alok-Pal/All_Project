import { UserModal } from "../../modal/userModal/userModal";
import userRepo from "../../repository";
import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { Responsemodal } from "../../modal/responseModal";
import { UserLoginModal } from "../../modal/userModal/userLoginModal";
import jwtDecode from "jwt-decode";
// import { isEmail, isPassword } from "../../middleware/userValidation/userValidation";

dotenv.config()

let responseModal = new Responsemodal()
class UserController {

    async registerUser(req: Request, res: Response) {

        const user: UserModal = {
            // id: '',
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password
        }
        // JWT     
        try {
            user.password = await bcrypt.hash(user.password as string, 10)
            console.log(user.password)


            const userRes = await userRepo.userRepo.register(user)
            // user.id = userRes.id

            let userResponse = {
                id :userRes.id,
                email: userRes.email,
                password: userRes.password

            }
            console.log(user.id);
            const token = jwt.sign(userResponse, process.env.APP_KEY as string, { expiresIn: 20 })


            let responseModal: Responsemodal = {
                message: "User Registered Successfully",
                data: { user: userRes, accessToken: token },
                status: 200,
                error: null
            }

            res.status(200).send(responseModal)
            

        } catch (error) {
            responseModal.status = 400
            responseModal.message = "User is not Registered"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    async login(req: Request, res: Response) {

        const user: UserLoginModal = {
            email: req.body.email,
            password: req.body.password,
        }
        console.log("edfsdffewfwdfefwwe", user.password);
         
        try {
            const userRes = await userRepo.userRepo.login(user.email)

            console.log(userRes);
            console.log(user.email);
            console.log(userRes?.email);

            if (!await bcrypt.compare(user.password, userRes?.password as string)) {
                responseModal.status = 400
                responseModal.message = "Please check your credintials"
                responseModal.data = null
                res.status(400).send(responseModal)

            }
            else {
                user.id = userRes?.id
                console.log(user);

                const token = jwt.sign(user, process.env.APP_KEY as string, { expiresIn: 30 }) // 30 means 30sec
                console.log(token)

                let responseModal: Responsemodal = {
                    message: "User Loggedin Successfully",
                    data: { user: user, token: token },
                    status: 200,
                    error: null
                }
                res.status(200).send(responseModal)
            }



        } catch (error) {
            responseModal.message = "Please Enter Correct Login Details"
            responseModal.data = null
            res.send(responseModal)
        }
    }


    async getUser(req: Request, res: Response) {

        console.log(( req as any).Uid );

        const passId = ( req as any).Uid
        

        const data = await userRepo.userRepo.getUser(passId)
        res.send(data)
    }
}



export default new UserController()