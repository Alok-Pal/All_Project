import prisma from "../../../prisma";


class HeadersRepo {
    async getheaders(month: any) {
        return await prisma.header.findMany({
            where: {
                month: {
                    contains: month
                }
            }
        })
    }

    async postHeaders(data: any) {
        return await prisma.header.create({
            data: data
        })
    }

    async putHeaders(data: any, updateId: string) {
        return await prisma.header.update({
            where: { id: updateId },
            data: data
        })
    }
}

export default new HeadersRepo()