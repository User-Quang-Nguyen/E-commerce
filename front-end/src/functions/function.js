import axios from "axios";
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
          const response = await axios.post("http://localhost:5000/authentication/verify", data);
          const decodedData = response.data;
          return decodedData;
        }
      } catch (error) {
        console.error("Error", error);
        return { message: false };
      }
}

export default sleep;