import axios from "axios";
import { BASE_URL } from "./baseURL";

export const getAndSetData = async (url, setProducts) => {
    try {
        const response = await axios.get(url);
        setProducts(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getProductById = async (id) => {
    try {
        const infoResponse = await axios.get(`${BASE_URL}/products/${id}`);
        const imageResponse = await axios.get(`${BASE_URL}/products/${id}/image`);
        var res = {
            "info": infoResponse.data,
            "image": imageResponse.data
        }
        return res;
    } catch (e) {
        console.error(e);
        return [];
    }
}