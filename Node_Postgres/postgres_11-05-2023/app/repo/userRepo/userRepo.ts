import prisma from "../../../prisma"
import { UserModal } from "../../modal/UserModal/userRegisterModal"

class UserRepo {
    async registerUser(userModal: UserModal) {
        return await prisma.user.create({
            data: {
                email: userModal.email,
                name: userModal.name,
                password: userModal.password
            }
        })
    }

    async userlogin(email: string) {

        return await prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }

    async getUser(userId: number) {
        return await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                posts: {
                    select: {
                        title: true,
                        published: true,
                        content: true,
                        category: true
                    }
                }

            },
            // select:{
            //     posts:true,
            //     category
            // }
        })
    }

    //------------------------------------------------------------------------------------------------------

    async updateUserData(userModal: UserModal, UId: number) {
        return await prisma.user.update({
            where: {
                id: UId
            },
            data: {
                email: userModal.email,
                name: userModal.name,
                password: userModal.password
            }
        })
    }

    //------------------------------------------------------------------------------------------------------

    async deleteUser(delteId : number){
        return prisma.user.delete({
            where:{
                id: delteId
            }
        })
    }

}


export default new UserRepo()