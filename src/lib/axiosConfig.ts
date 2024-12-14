import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const InstanceGuest = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
