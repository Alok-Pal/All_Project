import express from 'express'
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient()


class getInvoices {

   async getInvoice(req: Request, res: Response) {

      console.log("Get Api is working")
   }
}
export default new getInvoices();