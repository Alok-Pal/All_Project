import prisma from '../../../prisma/index'
import { DrugModel } from '../../modal/drugModel'

class drugsRepository {

    async getDrug() {
        return await prisma.drugs.findMany()

    }

    async postDrug(drugModal: DrugModel) {
        return await prisma.drugs.create({
            data: {
                drug_name: drugModal.drugName,
                manufacturer: drugModal.manufacturer,
                qty: drugModal.qty,
                price: drugModal.price
            }
        })
    }

    async putDrug(itemToUpdate: any, dataToUpdate: any) {
        return await prisma.drugs.update(
            {
                where: {
                    id: itemToUpdate
                },
                data: dataToUpdate
            }
        )

    }
    async deleteUser(itemtodelete: any) {
        return await prisma.drugs.delete({
            where: {
                id: itemtodelete
            }
        })
    }
    async sort(itemToSort: any) {
        const sortedDrugs = await prisma.drugs.findMany({
            orderBy: {
                price: itemToSort
            }
        });
        return sortedDrugs
    }

    async search(itemToSearch: any) {
        const searchedDrugs = await prisma.drugs.findMany({
            where: {
                qty: {
                    // contains: "2323"
                    contains: itemToSearch.toString()
                }
            }
        });
        return searchedDrugs
    }

    async filter(itemToFilter: any) {
        const filteredUsers = await prisma.drugs.findMany({
            where: {
                OR: [
                    {
                        drug_name: {
                            contains: itemToFilter
                        }
                    },
                    {
                        drug_name: {
                            contains: itemToFilter
                        }
                    }
                ]
            }
        });
        return filteredUsers
    }
}

export default new drugsRepository()


