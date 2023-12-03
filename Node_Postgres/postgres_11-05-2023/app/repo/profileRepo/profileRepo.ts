import prisma from "../../../prisma"
import { ProfileModal } from "../../modal/profileModal/profileModal"




class ProfileRepo {
    async saveProfile(profileModal: ProfileModal) {

        return await prisma.profile.create({
            data: {
                bio: profileModal.bio,
                userId: profileModal.userId
            }
        })

    }


    async getProfile(Uid: number) {
        return await prisma.profile.findFirst({
            where: {
                userId: Uid
            }
        })
    }

    async updateRepo( updateId: number , profileModal:ProfileModal){
        return await prisma.profile.update({
            where:{
                id: updateId
            },
            data:{
                bio:profileModal.bio,
                userId: profileModal.userId
            }
        })
    }

    async deleteProfile(deleteId : number){
        return await prisma.profile.delete({
            where:{
                id : deleteId
            }
        })
    }
}

export default new ProfileRepo()