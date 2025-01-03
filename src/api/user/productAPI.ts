import { InstanceGuest } from '../../lib/axiosConfig';
import ReactGA from 'react-ga4';

export const menuListAPI = async () => {
  try {
    const url = `${process.env.REACT_APP_P01_URL}`;
    const response = await InstanceGuest.get(url);
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const menuDetailAPI = async (id: number) => {
  try {
    const url = `${process.env.REACT_APP_P02_URL}/${id}`;
    const response = await InstanceGuest.get(url);

    ReactGA.event({
      category: 'Product',
      action: 'View Detail',
      label: `${response.data.result}`,
    });

    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};
