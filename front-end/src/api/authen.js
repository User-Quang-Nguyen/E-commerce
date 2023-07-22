import axios from "axios";
import {useState} from 'react'
import { message } from 'antd';
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../functions/handleToken";

export function HandleLogin(data) {
    const initToken = getToken();
    const [token, setToken] = useState(initToken);
    // const navigate = useNavigate();
    axios.post('http://localhost:5000/authentication/login', data)
        .then((response) => {
            message.success('Đăng nhập thành công!', 2);
            setToken(response.data.data.token);
            // navigate('/', { replace: true });
        })
        .catch((error) => {
            console.log(error.response.data);
            message.error('Đăng nhập thất bại!', 3);
        });
}