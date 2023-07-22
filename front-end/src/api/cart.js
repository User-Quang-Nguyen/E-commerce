import axios from "axios";
import { message } from "antd";

export const handleAddToCart = async (formData) => {
    try {
        const response = await axios.post("http://localhost:5000/users/cart", formData);
        message.success("Thêm giỏ thành công !");
    } catch (error) {
        console.log(error);
    }
}

export const handleGetCartInfo = async (id) => {
    try {
        var getCartInfo = `http://localhost:5000/users/${id}/cart`;
        const info = await axios.get(getCartInfo);
        return info.data;
    } catch (error) {
        console.error(error);
    }
} 