import React, { useEffect, useState } from "react";
import Table_product from "../../components/TableProduct";
import { getShippingInfo } from "../../api/user";
import { handleGetCartInfo } from "../../api/cart";

const Body = ({ authState }) => {
    const [items, setItems] = useState([]);
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fectch = async () => {
            if (!authState.id) return;
            const address = await getShippingInfo(authState.id);
            const items = await handleGetCartInfo(authState.id);
            setAddress(address);
            setItems(items);
        }

        try {
            fectch();
        } catch (e) {
            console.error(e);
        }

    }, [authState]);

    useEffect(() => { }, [items])

    return (
        <div>
            <div style={{ backgroundColor: '#D9D9D9', padding: '10px' }}>
                <span>Địa chỉ nhận hàng: </span>
                <span>
                    <a href="">Thay đổi</a>
                </span>
                <p>{address}</p>
            </div>
            <div>
                <Table_product data={items} />
            </div>
        </div>
    )
}
export default Body;