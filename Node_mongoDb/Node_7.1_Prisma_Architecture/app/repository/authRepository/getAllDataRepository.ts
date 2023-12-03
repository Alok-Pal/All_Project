import prisma from "../../../prisma/index"
import { GetAllDataFromDataBase } from "../../modal/getAllDataModal"


class GetAllData {

    async getdata() {

        return await prisma.getAllData.findMany()
    }

    async postData(getData: GetAllDataFromDataBase) {
        console.log("Huih",getData)
        const postData = await prisma.getAllData.create({
            data: {
                // userList: {
                
                //     connect: getData.UserDetails.map((detail:string[]) => ({ id: detail }))
                // }
                 userList : getData.UserDetails
            }
        })

        return postData
    }
}

export default new GetAllData()