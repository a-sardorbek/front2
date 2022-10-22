import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const API_URL = "https://exclusivehouseservice.uz/backend/";
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${cookies.get("token")}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
