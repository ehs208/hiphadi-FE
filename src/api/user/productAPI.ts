import { InstanceGuest } from '../../lib/axiosConfig';
import { extractErrorMessage } from '../../lib/errorUtils';

export const menuListAPI = async () => {
  try {
    const url = '/api/products';
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const menuDetailAPI = async (id: number) => {
  try {
    const url = `/api/products/${id}`;
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
