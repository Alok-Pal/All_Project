import prisma from "../../../prisma";
import { FormModal } from "../../modal/formModal";


class FormRepo {
    async postForm(formModal: FormModal) {
        return await prisma.formdata.create({
            data: {
                Date: formModal.Date,
                checkedBox: formModal.checkedBox,
                color: formModal.color,
                email: formModal.email,
                gender: formModal.gender,
                password: formModal.password,
                phoneNumber: formModal.phoneNumber,
                teaxtarea: formModal.teaxtarea
            }
        })
    }
}

export default new FormRepo()
