import { InstanceGuest } from '../../lib/axiosConfig';

export const adminLoginAPI = async (data: any) => {
  try {
    const url = '/api/admin/login';

    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const response = await InstanceGuest.post(url, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const changeSituationAPI = async (situation: String) => {
  try {
    const url = `/api/admin/situation/${situation}`;
    const response = await InstanceGuest.patch(url);
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const checkLoginAPI = async () => {
  try {
    const url = '/api/admin/checkLogin';
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const checkSituationStatus = async () => {
  try {
    const url = '/api/admin/situation';
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const menuListAdminAPI = async (situation: String) => {
  try {
    const url = `/api/admin/menu/list/${situation}`;
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const menuDetailAdminAPI = async (id: number) => {
  try {
    const url = `/api/admin/menu/detail/${id}`;
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};
