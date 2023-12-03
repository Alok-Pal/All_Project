
import prisma from "../../prisma";

class CustomerRepository {

    //  post data
    async postCustomer(data: any) {
        return await prisma.customer.create({
            data : data
        })
    }


    // get customers

    async getCustomer() {
        return await prisma.customer.findMany()
    }


    //  post Email which are coming to the MQ

    async postEmail(data: any) {
        return await prisma.checkEmail.create({
            data :{
                email : data 
            }
        })
    }
}

export default new CustomerRepository();