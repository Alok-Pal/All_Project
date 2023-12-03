import prisma  from "../../../prisma/index"


class UserRepo{

    async getuserData (){
        return await prisma.user.findMany({
            include:{
                SalaryAccount: true,
                comments: true
            }
        })
    }
}
export default new UserRepo()