import prisma from "../../../prisma/index"
import { UserModal } from "../../model/userModel"


class UserRepo {

    async getUserData() {
        return await prisma.user.findMany({
            include:{
                post: true
            }

            // select :{
            //     post:{
                    
            //     }
            // }
        })
    }

    async postData(userModal: UserModal) {
        const data = await prisma.user.create({
            data: {
                name: userModal.name,
                age: userModal.age,
                email: userModal.email,
                postId: userModal.postId
            }
        })
        return data
    }
}

export default new UserRepo()