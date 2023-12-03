import { Request, Response } from "express";
import formRepo from "../../repo";
import { Responsemodal } from './../../modal/responseModal';
import multer from "multer";
import { FormModal } from "../../modal/formModal";
import { rename } from 'node:fs';
import * as fs from 'node:fs';

const upload = multer({ dest: "uploads/" });

let responseModal = new Responsemodal()

class FormController {
    async postFormDat(req: Request, res: Response) {
        // const data = req.body;
        // console.log("🚀 ~ file: formController.ts:10 ~ FormController ~ postFormDat ~ data:", data)

        try {

            upload.single("file")(req, res, async (err: any) => {

                if (err) {

                    console.log(err);
                    return res.status(400).send("File upload failed");
                }


                const file = req.file;
                console.log("File:", file);

                // const filetype = req.file?.mimetype?.split("/")[1]
                // console.log("🚀 ~ file: formController.ts:30 ~ FormController ~ upload.single ~ filetype:", filetype)

                // //    

                // const newfilename = req.file?.filename + '.' + filetype;
                // console.log("🚀 ~ file: formController.ts:38 ~ FormController ~ upload.single ~ newfilename:", newfilename)

                // console.log("qwqwqwqw",`../../../uploads/${req.file?.filename}`);

                // fs.rename(`../../../uploads/${req.file?.filename}`, `../../../newData${newfilename}`,function(e){
                //     console.log( "12323213",e)
                //     // res.send()
                // })

                const fdata = {
                    Date: req.body.Date,
                    checkedBox: (req.body.checkedBox),
                    color: req.body.color,
                    email: req.body.email,
                    gender: req.body.gender,
                    password: req.body.password,
                    phoneNumber: req.body.phoneNumber,
                    teaxtarea: req.body.teaxtarea
                    
                }


                try {

                    const response = await formRepo.formRepo.postForm(fdata)
                    console.log(response);
                    responseModal.message = "Success"
                    responseModal.status = 200
                    responseModal.data = response
                    res.send(responseModal)

                } catch (error) {
                    responseModal.message = "Error"
                    responseModal.status = 400
                    res.send(responseModal)
                    console.log(error);
                }
            })

        }
        catch (error) {

        }
    }
}
export default new FormController()