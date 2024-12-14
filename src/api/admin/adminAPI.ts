import { InstanceGuest } from '../../lib/axiosConfig';

export const adminLoginAPI = async (data: any) => {
  try {
    const url = `${process.env.REACT_APP_A01_URL}`;

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
    const url = `${process.env.REACT_APP_A02_URL}/${situation}`;
    const response = await InstanceGuest.patch(url);
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};
