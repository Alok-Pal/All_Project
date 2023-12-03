import { Request, Response } from "express"
import { ProfileModal } from "../../modal/profileModal/profileModal"
import { Responsemodal } from "../../modal/responseModal"
import profileRepo from "../../repo"


let responseModal = new Responsemodal()

class ProfileController {
    async postProfile(req: Request, res: Response) {
        console.log("save");
        try {
            const Uid = (req as any).Uid
            console.log(Uid);
            const profileModal: ProfileModal = {
                bio: req.body.bio,
                userId: Uid
            }

            const data = await profileRepo.profileRepo.saveProfile(profileModal)

            // Response to user
            responseModal.message = "Data posted Successsfully"
            responseModal.status = 200
            responseModal.data = data
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

    async getProfile(req: Request, res: Response) {

        try {
            const UID = (req as any).Uid

            const data = profileRepo.profileRepo.getProfile(UID)

            // Response to user
            responseModal.message = "Data get Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)

        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not found"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }


    async updateProfile(req: Request, res: Response) {
        try {
            const updateId = req.params.id

            const UID = (req as any).id
            console.log(UID);
            const profileModal: ProfileModal = {
                bio: req.body.bio,
                userId: UID
            }

            const data = await profileRepo.profileRepo.updateRepo(parseInt(updateId), profileModal)
            // Response to user
            responseModal.message = "Data updated Successsfully"
            responseModal.status = 200
            responseModal.data = data
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not updated"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }




    async deleteProfile(req: Request, res: Response) {
        try {

            const deleteId = req.params.id

            const data = await profileRepo.profileRepo.deleteProfile(parseInt(deleteId))

            // Response to user
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


export default new ProfileController()