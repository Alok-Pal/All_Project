import { Request,Response } from "express";
import userRepo   from "../../repository/index"

class UserController{

    async getData (req:Request,res:Response){
        console.log("Alok")
        const data = await userRepo.userRepos.getuserData()
        res.send(data)
    }

    async postComments(req:Request, res: Response){
        const data = await userRepo.commentsRepo.saveComments()
        res.send(data)
    }

    async getUserByComment(req:Request, res: Response){
        const data = await userRepo.commentsRepo.getuserData()
        res.send(data)
    }
}
export default new UserController()