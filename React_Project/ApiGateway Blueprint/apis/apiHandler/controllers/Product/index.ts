// import { ResponseStatus } from '../../../apiUtils/interfacesAndTypes.ts/enum';
import { commanResponse } from '../../../apiUtils/models/commonResponse';
import * as Yup from 'yup';
import { productService } from '../../services/Product';
import { ResponseStatus } from 'src/apis/apiUtils/interfacesAndTypes';
export const productController = {
  insertProduct
};

async function insertProduct(object: any) {
  try {
    let responseOBJ = new commanResponse();

    //schema for payload
    let productSchema = Yup.object({
      title: Yup.string().required(),
      price: Yup.number().required().positive(),
      description: Yup.string().required(),
      image: Yup.string().url(),
      category: Yup.string().required(),
      TEST:Yup.string().required()
    });

    if (await productSchema.isValid(object)) {
      const response = await productService.createProduct(object);

      if (response) {
        responseOBJ.Status = response?.status === 200 ? true : false;
        responseOBJ.Result = response?.data ? response?.data : undefined;
        responseOBJ.ResponseStatus = response.status;
      }
    } else {
      responseOBJ.ResponseStatus = ResponseStatus.UnprocessableEntity;
      responseOBJ.Status = false;
      responseOBJ.Message = await productSchema
        .validate(object)
        .catch((e) => e.message);
    }
    return responseOBJ;
  } catch (error) {
    console.log('error From controller::>', error);
  }
}
