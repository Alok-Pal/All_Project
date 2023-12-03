import prisma from "../../../prisma";
import { OrderModal } from "../../Modlel/OrderModel/OrderModal";


class OrderRepo{
    async createOrder(orderModal: OrderModal ){
        return await prisma.orders.create(
            {
                data :{
                    customerName : orderModal.customerName,
                    orderQuantity : orderModal.orderQuantity,
                    stockId: orderModal.stockId,
                }
            }
        )

    }

    async getOrder(){
        return await prisma.orders.findMany({
            include:{
                Stock:{
                    select:{
                        stockName :true
                    }
                }
            }
        })
    }

    async deleteOrder(id : string){
        return await prisma.orders.delete({
            where:{
                id : id
            }
        })
    }
}

export default new  OrderRepo()