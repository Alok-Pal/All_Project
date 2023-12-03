import { requestMethod } from 'src/apis/apiUtils/constants';
import { requestModel } from '../../../apiUtils/models/requestModel';
import { axiosRepository } from '../../repository';
import { productEndPoints } from 'src/apis/apiEndPoints';

export const productService = {
  createProduct: async (body: any) => {
    const reqestObj = new requestModel();
    try {
      reqestObj.method = requestMethod.POST;
      reqestObj.url = productEndPoints.INSERT_PRODUCT;
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log('error from services::>', error);
    }
  }
};
