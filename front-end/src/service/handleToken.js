import axios from "axios";
import { BASE_URL } from "../api/baseURL";

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const verifyToken = async () => {
  var token = localStorage.getItem('token');
  var data = {
    'token': token,
  }
  try {
    if (data.token === null || data.token === '') return { message: false };
    else {
      const response = await axios.post(`${BASE_URL}/authentication/loginVerification`, data);
      const decodedData = response.data;
      return decodedData;
    }
  } catch (error) {
    console.error("Error", error);
    return { message: false };
  }
};

export const getToken = localStorage.getItem('token');

export const setToken = (token) => {
  localStorage.setItem('token', token);
}