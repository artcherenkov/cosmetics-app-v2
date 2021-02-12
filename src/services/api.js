import axios from 'axios';

const BACKEND_URL = `https://13dd4c530fb8.ngrok.io`;
const REQUEST_TIMEOUT = 10000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
