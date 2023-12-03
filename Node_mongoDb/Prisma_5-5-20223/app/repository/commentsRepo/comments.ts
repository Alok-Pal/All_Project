import prisma  from "../../../prisma/index"


class UserRepo{

    async getuserData (){
        return await prisma.comments.findMany({
            include:{
              user:true
            }

        })
    }

    async saveComments() {
        return await prisma.comments.create ({
            data:{
                article: 'Hardik comments'
            }
        })
    }
}
export default new UserRepo()