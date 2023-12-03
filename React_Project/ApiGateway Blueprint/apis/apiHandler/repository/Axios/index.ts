import { requestInterface } from 'src/apis/apiUtils/interfacesAndTypes.js';
import { api } from './interceptors';

export const axiosRepository = {
  request: async (requestModal: requestInterface) =>
    await api.request(JSON.parse(JSON.stringify(requestModal)))
};
