import prisma from "../../../prisma";


class SupplierRepo {
    async getAllSupplier(month: any) {
        return await prisma.supplier.findMany({
            include: {
                invoice: {
                    where: {
                        month: {
                            contains: month
                        }
                    }
                }
            }
        })
    }




    async postInvoice(data: any) {
        console.log("1");
        return await prisma.invoice.createMany({
            data: data
        })
    }


    async updateInvoices(data: any) {
        console.log("--------------------------------->DAta Invoices ", data);
        data.map(async (inVoicedata: any) => {
            return await prisma.invoice.update({
                where: {
                    id: inVoicedata.id
                },
                data: {
                    supplierId: inVoicedata.supplierId,
                    field1: parseInt(inVoicedata.field1),
                    field2: parseInt(inVoicedata.field2),
                    field3: parseInt(inVoicedata.field3),
                    field4: parseInt(inVoicedata.field4),
                    field5: parseInt(inVoicedata.field5),
                    field6: parseInt(inVoicedata.field6),
                    field7: parseInt(inVoicedata.field7),
                    field8: parseInt(inVoicedata.field8),
                    field9: parseInt(inVoicedata.field9),
                    field10: parseInt(inVoicedata.field10),
                    field11: parseInt(inVoicedata.field11),
                    Net: parseInt(inVoicedata.Net),
                    Vat: parseInt(inVoicedata.Vat),
                    Advance: parseInt(inVoicedata.Advance),
                    Balance: parseInt(inVoicedata.Balance),
                    month: inVoicedata.month,
                    isApproved: inVoicedata.isApproved,
                    isChkBox: inVoicedata.isChkBox
                }

            })
        })

    }

    async downloadPdf (data:any) {
        return await prisma.invoice.createMany({
            data: data
        })
    }
}

export default new SupplierRepo()