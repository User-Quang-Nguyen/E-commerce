import React from "react";
import axios from "axios";

export const getAndSetAPIData = async (url, setProducts) => {
    try {
        const response = await axios.get(url);
        setProducts(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getProductById = async (id) => {
    try {
        const infoResponse = await axios.get(`http://localhost:5000/products/${id}`);
        const imageResponse = await axios.get(`http://localhost:5000/products/${id}/image`);
        var res = {
            "info": infoResponse.data,
            "image": imageResponse.data
        }
        return res;
    } catch (e) {
        console.error(e);
    }
}