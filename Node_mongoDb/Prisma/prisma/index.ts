import { PrismaClient } from '@prisma/client'       
const prisma = new PrismaClient()

export { prisma }


// we have made this file because we dont want to make new instance in every controller. we can directly excess it using import