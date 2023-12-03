import { Request, Response } from "express";
import { Responsemodal } from "../../modal/responseModal/responseModal";
import { CreateUser, UserLoginnModal, UserModal } from "../../modal/userModal/userModal";
import bcrypt from "bcrypt";
import userRepo from "../../repo";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import { permissionCheck } from "../../middleware/auth/permissionCheck";
import { permissions } from "../../middleware/permissionConst/permissionConst";


dotenv.config()

const responseModal = new Responsemodal()

class UserController {

    // Register user
    async userSignUp(req: Request, res: Response) {
        console.log("USERsIGN UP RUNNN");

        const p1 = parseInt(req.body.mobile)
        console.log("sdddddddddddddddddddd", typeof p1);

        const user: UserModal = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: parseInt(req.body.mobile),
            address: req.body.address,
            pincode: parseInt(req.body.pincode),
            roleId: "647849acee6c4861fb4055f1",  //USER ID
        }

        try {

            user.password = await bcrypt.hash(user.password as string, 10)
            console.log(user.password);

            const userResposnse = await userRepo.userRepo.userSignUp(user)

            const resToToken = {
                id: userResposnse.id,
                email: userResposnse.email,
                password: userResposnse.password
            }

            const token = jwt.sign(resToToken, process.env.APP_KEY as string, { expiresIn: 7200 })
            responseModal.status = 200
            responseModal.data = { userResposnse, token: token }
            responseModal.message = "User register successfully"
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



    // LogIn User
    async userLogin(req: Request, res: Response) {
        console.log("USER LOGIN RUNNN");

        let user: UserLoginnModal = {
            email: req.body.email,
            password: req.body.password
        }


        try {
            const response = await userRepo.userRepo.userLogIn(user.email)
            console.log("_________________________________", response);

            if (!await bcrypt.compare(user.password, response[0]?.password as string)) {
                responseModal.status = 400
                responseModal.message = "Please check your credintials"
                responseModal.data = null
                res.status(400).send(responseModal)

            }
            else {
                user.id = response[0]?.id

                const token = jwt.sign(user, process.env.APP_KEY as string, { expiresIn: 7200 })

                responseModal.status = 200
                responseModal.message = "User Loggedin Successfully"
                responseModal.data = { data: user, token: token, role: response }
                res.status(200).send(responseModal)
            }

        } catch (error) {
            responseModal.message = "Please Enter Correct Login Details"
            responseModal.data = null
            responseModal.status = 400
            res.send(responseModal)
        }
    }


    // Update User

    async userUpdate(req: Request, res: Response) {

        const updateId = req.params.id
        console.log("🚀 ~ file: userController.ts:113 ~ UserController ~ userUpdate ~ updateId:", updateId)

        const user: UserModal = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: parseInt(req.body.mobile),
            address: req.body.address,
            pincode: parseInt(req.body.pincode),
            roleId: req.body.role,    // here i have put the role as the id come from the select tag is in the role name of the object
        }
        console.log("userrrrrrrrrrrrrr",user);
        try {

            const response = await userRepo.userRepo.userUpdate(user, updateId)
            responseModal.status = 200
            responseModal.message = "User Updated Successfully"
            responseModal.data = response
            res.status(200).send(responseModal)

        } catch (error) {
            responseModal.message = "Useris not Updated "
            responseModal.data = null
            res.send(responseModal)
        }
    }


    // delete user

    async deleteUser(req: any, res: Response) {

        const permissionObject = req.object
        console.log("🚀 ~ file: userController.ts:145 ~ UserController ~ deleteUser ~ permissionObject:", permissionObject)

        if (permissionCheck(permissionObject, permissions.DELETE_USER_PERMISSION) == true) {



            const deleteId = req.params.id
            try {

                const response = await userRepo.userRepo.userDelete(deleteId)
                responseModal.status = 200
                responseModal.message = "User Deleted Successfully"
                responseModal.data = response
                res.send(responseModal)
            } catch (error) {
                responseModal.message = "User is not Deleted"
                responseModal.data = null
                res.send(responseModal)
            }
        }
        else{
            responseModal.message = "User is forbidden to Delete this"
            responseModal.data = null
            res.send(responseModal)
        }

    }

    // Get user by id

    async getUserById(req: Request, res: Response) {
        const userId = req.params.id

        const permissionObject = (req as any).object

        if (permissionCheck(permissionObject, permissions.VIEW_PROFILE) == true) {


        try {
            const response = await userRepo.userRepo.userGetById(userId)
            responseModal.status = 200
            responseModal.message = "User Found"
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "User is not Found"
            responseModal.data = error
            res.send(responseModal)
            console.log(error)

        }
    }
else{
    responseModal.status = 403
    responseModal.message = "User is forbidden to view user"
    responseModal.data = null
    res.send(responseModal)
}
    }

    // Get all user
    async getAllUser(req: Request, res: Response) {
        try {
            const response = await userRepo.userRepo.userGetAll()
            responseModal.status = 200
            responseModal.message = "User Found"
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "User is not Found"
            responseModal.data = error
            res.send(responseModal)
            console.log(error)

        }
    }


    // Create Role

    async createRole(req: Request, res: Response){
        const data = req.body
        console.log("🚀 ~ file: userController.ts:230 ~ UserController ~ createRole ~ data:", data.checkbox)
        const createuser : CreateUser={
            RoleName :data.input,
            permissionId : data.checkbox

        }
        console.log("🚀 ~ file: userController.ts:234 ~ UserController ~ createRole ~ createuser:", createuser)

        try {
            const response = await userRepo.userRepo.CreateRole(createuser)
            console.log("🚀 ~ file: userController.ts:238 ~ UserController ~ createRole ~ response:", response)
            responseModal.status = 200
            responseModal.message = "Role Created"
            responseModal.data = response
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Role is not Created"
            responseModal.data = error
            res.send(responseModal)
            console.log(error)
        }
    }
}


export default new UserController()