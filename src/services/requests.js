// @flow
import axios from 'axios';
import * as actions from 'services/redux/user/actions';
import { store } from 'services'
import { toast } from 'react-toastify'

export const BASE_API_URL: string = `${process.env.REACT_APP_BASE_API_URL || 'localhost:3000'}`;

const customAxios = axios.create({
  baseURL: BASE_API_URL,
});

customAxios.interceptors.response.use(
  response => response,
  error => {
    // Add logic to handle error here
    // console.log(error.response.data)
    if (error.response && error.response.data.code === 500) {
      switch (error.response.data.message) {
        case "Signature has expired":
          store.dispatch(actions.logOut());
          toast.error('Your session has expired. Please sign in to continue');
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default { customAxios };
