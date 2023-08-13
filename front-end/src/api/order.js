import axios from "axios";
import React from "react";
import { BASE_URL } from "./baseURL";

export async function HandleGetOrder(userId) {
    try{
        const result = await axios.get(`${BASE_URL}/users/${userId}/cart/order`);
        return result;
    }catch(e){
        console.error(e);
    }
}