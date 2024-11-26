import { InstanceGuest } from '../../lib/axiosConfig';

export const productListAPI = async () => {
  try {
    const url = `${process.env.REACT_APP_P01_URL}`;
    const response = await InstanceGuest.get(url);
    return response.data.data;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const productDetailAPI = async (id: number) => {
  try {
    const url = `${process.env.REACT_APP_P02_URL}/${id}`;
    const response = await InstanceGuest.get(url);
    return response.data.data;
  } catch (error) {
    throw new Error(String(error));
  }
};
