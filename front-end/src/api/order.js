import axios from "axios";
import { BASE_URL } from "./baseURL";
import { getToken } from "../service/handleToken";

export async function HandleGetOrder(userId) {
    try {
        const result = await axios.get(`${BASE_URL}/users/${userId}/cart/order`, {
            headers: {
                Authorization: `${getToken}`
            }
        });
        return result;
    } catch (e) {
        console.error(e);
    }
}