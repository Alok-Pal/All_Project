import { NextFunction, Request, Response } from "express";

//  we are using the function way because in this we are not able to pass the schema from controller

// class ProductSchemaValidation {

//     async validation(req: Request, res: Response, next: NextFunction) {

//         const data = req.body

//     }

// }


const productValidation =  (schema : any) =>(req:Request, res: Response, next: NextFunction) =>{

    const data = req.body
    console.log("🚀 ~ file: productSchemaValidation.ts:19 ~ productValidation ~ data:", data)

}

export default  productValidation