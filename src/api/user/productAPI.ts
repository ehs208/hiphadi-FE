import { InstanceGuest } from '../../lib/axiosConfig';
import ReactGA from 'react-ga4';

export const menuListAPI = async () => {
  try {
    const url = '/api/menu/list';
    const response = await InstanceGuest.get(url);
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const menuDetailAPI = async (id: number) => {
  try {
    const url = `/api/menu/detail/${id}`;
    const response = await InstanceGuest.get(url);

    ReactGA.event('view_item', {
      currency: 'KRW',
      value: response.data.result.price,
      items: [
        {
          item_id: String(id),
          item_name: response.data.result.name,
          price: response.data.result.price,
        },
      ],
    });

    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};
