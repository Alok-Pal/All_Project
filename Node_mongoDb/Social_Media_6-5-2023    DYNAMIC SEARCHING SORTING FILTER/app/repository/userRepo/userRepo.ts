import { count } from "console"
import prisma from "../../../prisma/index"
import { UserModal } from "../../modal/userModal/userModal"

class Userrepo {
    async getUserData() {
        return await prisma.user.findMany({
            select: {
                _count: {
                    select: {
                        post: true
                    }
                }
            }
            // orderBy:{
            //     post:{
            //         _count:"asc"
            //     }
            // }
        })
    }

    async saveUserData(userModal: UserModal) {
        return await prisma.user.create({
            data: {
                name: userModal.name,
                gender: userModal.gender,
                qualification: userModal.qualification,
                status: userModal.status
            }

        })
    }
    async updateUserData(itemToUpdate: any, dataToUpdate: any) {

        return await prisma.user.update({
            where: {
                id: itemToUpdate
            },
            data: dataToUpdate
        })
    }

    async deleteUserData(itemToDelete: any) {
        return await prisma.user.delete({
            where: {
                id: itemToDelete
            }
        })
    }

    async sortingSearchingUser(itemToSearch: any) {
        // console.log(itemToSort);
        // console.log(itemToSearch)

        return await prisma.user.findMany(itemToSearch
            // {
            // Search  filter and sorting
            
            
            // where: {
            //     OR: [
            //         {
            //             name: {
            //                 contains: itemToSearch,
            //                 mode: "insensitive"
            //             }
            //         }, {
            //             gender: {
            //                 equals: itemToFilter
            //             }
            //         }
            //     ],

            // },
            // orderBy: {
            //     name: itemToSort
            // },



            //filtering
            // equals
            // where:{
            //     gender :{equals:itemToFilter},
            // },


            // sorting
            // orderBy:{
            //     name:itemToSort
            // },


            // not
            // where:{
            //     name:{not:itemToSearch}
            // }

            // in
            // where:{
            //     name:{in:[itemToSearch]}
            // }

            // Not in

            // include: {
            //     post: {
            //         where: {
            //             comments: {

                            // every 
                            // here it gives all data as nothing starts with this
                            // every: {
                            //     commentsText:"Thanks"
                            // }

                            //some
                            // some:{
                            //     commentsText:"Thanks"
                            // }

                            //none
                            // none: {
                            //     commentsText: "thanks"
                            // }

                        // },
                        // category: {
                        //     every: {
                        //         category: "Fiction"
                        //     }
                        // }
            //             post_Desc: {

            //             }
            //         }
            //     }
            // }


            // paging
            // take:2,skip:1,

            //




        // }
         )

    }

    // async searching(itemToSearch: any) {
    //     return await prisma.user.findMany({
    //         where: {
    //             gender: {
    //                 contains: itemToSearch
    //             }
    //         }
    //     })
    // }
}
export default new Userrepo()