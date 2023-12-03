import prisma from "../../../prisma";
import { UserModal } from "../../modal/userModal/userModal";


class UserRepo {

    //  User SignUp Form
    async userSignUp(userModal: UserModal) {
        console.log("USERREPO");
        return await prisma.users.create({
            data: {
                name: userModal.name,
                email: userModal.email,
                password: userModal.password,
                mobile: userModal.mobile,
                address: userModal.address,
                pincode: userModal.pincode,
                roleId: userModal.roleId
            }


        })
    }

    // Login user
    async userLogIn(email: string) {
        return await prisma.users.findMany({
            where: {
                email: email,
            }, include: {
                role: {
                    select: {
                        RoleName: true,
                        permission: true
                    },


                }

            }
        })
    }

    //  update user

    async userUpdate(userModal: UserModal, userId: string) {
        return await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                name: userModal.name,
                email: userModal.email,
                password: userModal.password,
                mobile: userModal.mobile,
                address: userModal.address,
                pincode: userModal.pincode,
                roleId: userModal.roleId
            }
        })
    }

    // delete user
    async userDelete(userId: string) {
        return await prisma.users.delete({
            where: {
                id: userId
            }
        })
    }

    // get user by id

    async userGetById(userId: string) {
        return await prisma.users.findMany({
            where: {
                id: userId
            }
        })
    }

    // get all users
    async userGetAll() {
        return await prisma.users.findMany()
    }


    // get user by id to get permission

    async userGetPermissionById(userId: string) {
        return await prisma.users.findMany({
            where: {
                id: userId
            }, include: {
                role: {
                    include: {
                        permission: true
                    }
                }
            }
        })
    }

    // craete role
    async CreateRole(data : any) {
        return await prisma.role.create({
            data : data
        })
    }
}

export default new UserRepo();