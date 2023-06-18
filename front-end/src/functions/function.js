import axios from "axios";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const sendToken = () => {
    var token = localStorage.getItem('token');
    var data = {
        'token' : token,
    }
    // console.log(data);
    if (data === '') return;
    else {
        axios.post("http://localhost:5000/authentication/verify", data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error");
            })
    }
}

export default sleep;