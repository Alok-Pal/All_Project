import { Request, Response } from "express-serve-static-core";
import userRepo from "../../repository/index";
import { UserModal } from "../../modal/userModal/userModal";
import { Responsemodal } from "../../modal/responseModal";

let responseModal = new Responsemodal

class UserController {
    async getData(req: Request, res: Response) {
        console.log("get api");
        try {
            const data = await userRepo.userRepo.getUserData()
            responseModal.message = "Data get Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)
        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data not found"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }

    }

    async saveData(req: Request, res: Response) {
        console.log("hbdbca")

        try {
            const dataModal: UserModal = {
                name: req.body.name,
                gender: req.body.gender,
                qualification: req.body.qualification,
                status: req.body.status
            }

            const data = await userRepo.userRepo.saveUserData(dataModal);

            responseModal.message = "Data posted Successsfully"
            responseModal.status = 200
            responseModal.data = data;
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
    async updateData(req: Request, res: Response) {
        console.log("Update user")

        try {
            const itemToUpdate = req.params.id
            const data: UserModal = {
                name: req.body.name,
                gender: req.body.gender,
                qualification: req.body.qualification,
                status: req.body.status
            }

            const updateData = await userRepo.userRepo.updateUserData(itemToUpdate, data)
            responseModal.message = "Data updated Successsfully"
            responseModal.status = 200
            responseModal.data = data;
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

    async deleteData(req: Request, res: Response) {
        console.log("delete User")

        try {

            const itemToDelete = req.params.id
            const data = await userRepo.userRepo.deleteUserData(itemToDelete)
            responseModal.message = "Data deleted Successsfully"
            responseModal.status = 200
            responseModal.data = data;
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

    async getSortedSearch(req: Request, res: Response) {
        try {
            console.log(req.query);
            console.log(Object.keys(req.query));
            // to get keys
            const keyToSearch = Object.keys(req.query)
            
            // to set dynamic Search field and search
            const itemToSearch = req.query.search
            const searchKey = req.query.searchFields as string
            console.log(searchKey);
            console.log([searchKey]);
            
            // to set dynamic Filter field and filter
            const itemToFilter = req.query.filter
            const dynamicFilter = req.query.filterField as string
            console.log(dynamicFilter);
            // to set dynamic Sorting field and sort
            const itemToSort = req.query.sort
            const dynamicSort = req.query.sortFields as string
            console.log(dynamicSort);

            const query = {
                where: {},
                orderBy: {}
            }

            if ((itemToSearch != undefined && searchKey != undefined) || (itemToFilter != undefined && dynamicFilter != undefined )) {

                query.where = {
                    OR: [
                        {
                            [dynamicFilter]: {
                                equals: itemToFilter
                            }
                        },
                        {
                            [searchKey]: {
                                contains: itemToSearch,
                                mode: "insensitive"
                            }
                        },
                        
                    ]
                }
            }

            if (itemToSort != undefined && dynamicSort != undefined) {
                query.orderBy = {
                    [dynamicSort]: itemToSort
                }
            }

            const data = await userRepo.userRepo.sortingSearchingUser(query)
            responseModal.message = "Data sorted Successsfully"
            responseModal.status = 200
            responseModal.data = data;
            responseModal.error = null
            res.send(responseModal)


        } catch (error) {
            responseModal.status = 400
            responseModal.message = "Data is not sorted"
            responseModal.data = null
            responseModal.error = error
            res.send(responseModal)
            console.log(error)
        }
    }

    // async getSearching(req: Request, res: Response) {
    //     try {
    //         const itemToSearch = req.query.search
    //         console.log(itemToSearch)
    //         const data = await userRepo.userRepo.searching(itemToSearch)
    //         responseModal.message = "Data searched Successsfully"
    //         responseModal.status = 200
    //         responseModal.data = data;
    //         responseModal.error = null
    //         res.send(responseModal)


    //     } catch (error) {
    //         responseModal.status = 400
    //         responseModal.message = "Data is not searched"
    //         responseModal.data = null
    //         responseModal.error = error
    //         res.send(responseModal)
    //         console.log(error)
    //     }
    // }
}

export default new UserController()