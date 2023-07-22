import axios from "axios";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const verifyToken = async () => {
  var token = localStorage.getItem('token');
  var data = {
    'token': token,
  }
  try {
    if (data.token === null) return { message: false };
    else {
      const response = await axios.post("http://localhost:5000/authentication/loginVerification", data);
      const decodedData = response.data;
      return decodedData;
    }
  } catch (error) {
    console.error("Error", error);
    return { message: false };
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
}

export const setToken = (token) => {
  localStorage.setItem('token', token);
}

export default sleep;