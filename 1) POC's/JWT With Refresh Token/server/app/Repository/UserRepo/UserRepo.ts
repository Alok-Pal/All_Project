import prisma from "../../../prisma";

class  UserRepository{
    async registerUser(data : any){
        return await prisma.user.create({
            data : data
        })
    }


    async loginUser( email : any ){
        return await prisma.user.findMany({
            where:{
                email : email
            }
        })
    }

    async getUser(){
        return await prisma.user.findMany()
    }
}

export default new UserRepository()