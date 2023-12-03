import prisma from "../../../prisma/index"
import { ImdbModal } from "../../modal/imdbModal"


class ImbdRepository {
    async getImbdData() {
        return await prisma.imdb.findMany({
            where: {
                genre: "comedy"
            },
            select: {
                movies: true
                // {
                //     select: {
                //         movies_name: true
                //     }

                // }
            },orderBy:{
                id:"desc"
                
            },
            // include:{
            //     movies:{
            //         select:{
            //             movies_name:true
            //         }
            //     }
            // }
            skip:0,
    

            

        })
    }

    async postImdbData(imdbModal: ImdbModal) {
        return await prisma.imdb.create({
            data: {
                genre: imdbModal.genre,
                ratings: imdbModal.ratings,
               
            }, include: {
                movies: true
            }
        })
    }
}

export default new ImbdRepository()