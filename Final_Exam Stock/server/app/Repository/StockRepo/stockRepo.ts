import prisma from "../../../prisma";
import { StockModal } from "../../Modlel/StockModel/StockModel";

class StockRepo {
  //  create
  async createStock(stockData: StockModal) {
    return await prisma.stock.create({
      data: {
        stockName: stockData.stockName,
        stockQuantity: stockData.stockQuantity
      }
    })
  }


  //  get stock

  async getStock() {
    return await prisma.stock.findMany({
      include: {

        orders: {
          select: {
            orderQuantity: true
          }
        }
      }
    })
  }
}

export default new StockRepo();