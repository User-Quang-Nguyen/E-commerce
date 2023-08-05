import axios from "axios";
import { message } from 'antd';
import { setToken } from "../service/handleToken";
import { BASE_URL } from "./baseURL";

export function HandleLogin(data, navigate) {
    axios.post(`${BASE_URL}/authentication/login`, data)
        .then((response) => {
            setToken(response.data.data.token);
            message.success('Đăng nhập thành công!', 2);
            navigate('/', { replace: true });
        })
        .catch((error) => {
            console.log(error.response.data);
            message.error('Đăng nhập thất bại!', 3);
        });
}

export function HandleSignUp(data, navigate) {
    axios.post(`${BASE_URL}/authentication/signup`, data)
        .then((response) => {
            message.success('Đăng ký thành công!', 2);
            navigate('/signin', { replace: true });
        })
        .catch((error) => {
            console.log(error.response.data);
            message.error('Đăng ký thất bại!', 3);
        });
}