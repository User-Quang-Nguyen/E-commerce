import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "./baseURL";

export const handleAddToCart = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/cart`, formData);
        message.success("Thêm giỏ thành công !");
    } catch (error) {
        console.log(error);
    }
}

export const handleGetCartInfo = async (id) => {
    try {
        var getCartInfo = `${BASE_URL}/users/${id}/cart`;
        const info = await axios.get(getCartInfo);
        return info.data;
    } catch (error) {
        console.error(error);
    }
}

export const handleOrder = async (userId) => {
    try {
        const orderResponse = await axios.post(`${BASE_URL}/users/${userId}/cart/order`);
        message.success("Đặt hàng thành công!", 2);
    } catch (error) {
        message.error("Đặt hàng thất bại!");
    }
}

export const getTotalMoney = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/cart/total`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCartItem = async (userId, id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${userId}/cart/items/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateQuantity = async (formData) => {
    try {
        var query = `${BASE_URL}/users/cartitems`;
        axios.put(query, formData);
    } catch (error) {
        console.log(error)
    }
}