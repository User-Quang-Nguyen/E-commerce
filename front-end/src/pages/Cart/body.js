import React, { useEffect, useState } from "react";
import Table_product from "../../components/list";
import axios from "axios";

const Body = ({ isLoggedIn }) => {
    const [items, setItems] = useState([]);
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                var apiGetShippingInfo = `http://localhost:5000/users/${isLoggedIn.id}/delivery`;
                const shippingInfoRes = await axios.get(apiGetShippingInfo)
                setAddress(shippingInfoRes.data);

                var apiGetBodyInfo = `http://localhost:5000/users/${isLoggedIn.id}/cart/infor`;
                const bodyInfoResponse = await axios.get(apiGetBodyInfo)
                setItems(bodyInfoResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [isLoggedIn]);

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