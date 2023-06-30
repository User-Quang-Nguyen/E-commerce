import axios from "axios";
import { useState, useEffect } from "react";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const sendToken = async () => {
  var token = localStorage.getItem('token');
  var data = {
    'token': token,
  }
  // console.log(data);
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
}

export const CheckLogin = () => {

  const [loggedIn, setLoggedIn] = useState({
    message: false,
    id: '',
    email: '',
  });

  async function fetchData() {
    const result = await sendToken();
    setLoggedIn({
      message: result.message,
      id: result.result.userID,
      email: result.result.userEmail,
    });
  };
  useEffect(async () => {
    await fetchData();
  }, []);

  return loggedIn;
};

export default sleep;