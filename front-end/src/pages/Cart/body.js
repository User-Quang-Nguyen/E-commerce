import React, { useEffect, useState } from "react";
import Table_product from "../../components/list";
import axios from "axios";
import { sendToken } from "../../functions/function";
const dataTest = [
    {
        id: 1,
        image: 'https://cf.shopee.vn/file/0e65627a361422a1740ebb6dcb218e7e',
        name: 'One piece',
        category_name: 'Manga',
        price: 23000,
        quantity: 1,
    },
    {
        id: 2,
        image: 'https://cf.shopee.vn/file/0e65627a361422a1740ebb6dcb218e7e',
        name: 'One piece',
        category_name: 'Manga',
        price: 23000,
        quantity: 3,
    },
    {
        id: 3,
        image: 'https://cf.shopee.vn/file/0e65627a361422a1740ebb6dcb218e7e',
        name: 'One piece',
        category_name: 'Manga',
        price: 23000,
        quantity: 2,
    },
    {
        id: 4,
        image: 'https://cf.shopee.vn/file/0e65627a361422a1740ebb6dcb218e7e',
        name: 'One piece',
        category_name: 'Manga',
        price: 23000,
        quantity: 2,
    },
];


const Body = () => {
    const [items, setItems] = useState([]);
    const [address, setAddress] = useState([]);
    const [userID, setUserID] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await sendToken();
                console.log(result);
                var apiGetShippingInfo = "http://localhost:5000/user/addressForCart?id=" + result.result.userID;
                const shippingInfoRes = await axios.get(apiGetShippingInfo)
                setAddress(shippingInfoRes.data);

                var apiGetBodyInfo = "http://localhost:5000/cart?id=" + result.result.userID;
                const bodyInfoResponse = await axios.get(apiGetBodyInfo)
                console.log(bodyInfoResponse.data);
                setItems(bodyInfoResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => { }, [items])

    var shippingAddress = address.phoneNumber + ', ' + address.fullName + ', ' + address.address + '.';
    return (
        <div>
            <div style={{ backgroundColor: '#D9D9D9', padding: '10px' }}>
                <span>Địa chỉ nhận hàng: </span>
                <span>
                    <a href="">Thay đổi</a>
                </span>
                <p>{shippingAddress}</p>
            </div>
            <div>
                <Table_product data={items} />
            </div>
        </div>
    )
}
export default Body;