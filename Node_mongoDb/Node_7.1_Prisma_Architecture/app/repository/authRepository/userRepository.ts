import prisma from "../../../prisma"
import { UserModal } from "../../modal/userModal";



class UserRepository {

  async getrepo() {
    let getUser = await prisma.userList.findMany()
    return getUser;
  }

  async postRepo(postUser: UserModal) {
    console.log(postUser.name)
    if (postUser.name != " ") {
      let saveUser = await prisma.userList.create({
        data: {
          name: postUser.name,
          email: postUser.email,
          drugsId: postUser.drug,
          invoiceId : postUser.invoice
          
        }
      });
      return saveUser
    }



  }


  async putUser(itemToUpdate: string, dataToUpdate: any) {
    console.log("putuser")
    return await prisma.userList.update({
      where: {
        id: itemToUpdate
      },
      data: dataToUpdate
    });
  }


  async deleteUser(itemtodelete: any) {
    return await prisma.userList.delete({
      where: {
        id: itemtodelete
      }
    })
  }
}

export default new UserRepository()