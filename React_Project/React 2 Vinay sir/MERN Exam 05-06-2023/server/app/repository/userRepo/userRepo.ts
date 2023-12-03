import prisma from "../../../prisma";
import { LoginModal, UpdatUserModal, UserModal } from './../../modal/userModal/userModal';


class UserRepo {
    async RegisterUser(userModal: UserModal) {
        return await prisma.user.create({
            data: {
                name: userModal.name,
                email: userModal.email,
                phoneNumber: userModal.phoneNumber,
                password: userModal.password,
            }
        })
    }


    async LoginUser(email: string) {

        return await prisma.user.findMany({
            where: {
                email: email,
            }
        })
    }

    async getUserById(id: any) {
        return prisma.user.findMany({
            where: {
                id: id
            }
        })
    }


    async UpdateUser(id: any, userModal: UpdatUserModal) {
        return await prisma.user.update({
            where: { id: id },
            data: {
                name: userModal.name,
                phoneNumber: userModal.phoneNumber,
            }
        }
        )
    }
}
export default new UserRepo();