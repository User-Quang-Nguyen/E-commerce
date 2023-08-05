import axios from "axios";
import { BASE_URL } from "./baseURL";

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        const info = response.data;
        return info;
    } catch (e) {
        console.error(e);
    }
}

export const getAddress = async (authState) => {
    if (authState.isLoggedIn === true) {
        try {
            const response = await getUserById(authState.id);
            var addr = response[0].address + ', ' + response[0].city;
            return addr;
        } catch (e) {
            console.error(e);
            return '';
        }
    }
}

export const getShippingInfo = async (id) => {
    try {
        const response = await getUserById(id);
        var addr = response[0].phone_number + ", " + response[0].first_name + " " + response[0].last_name +
            ", " + response[0].address + " " + response[0].city;
        return addr;
    } catch (e) {
        console.error(e);
    }
}