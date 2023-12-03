import prisma from "../../../prisma"
import { UserModal } from "../../modal/userModal/userModal";



class UserRepo {

    async register(userModal: UserModal) {
        return await prisma.user.create({
            data: {
                name: userModal.name,
                email: userModal.email,
                age: userModal.age,
                password: userModal.password as string
            }
        })
    }


    async login(email: string) {
        return await prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }


    async getUser(userId:string){
        return await prisma.user.findFirst({
            where:{
                id : userId
            }
        })
    }
}

export default new UserRepo()