import React, { useEffect, useState } from "react";
import Table_product from "../../components/TableProduct";
import { getShippingInfo } from "../../api/user";
import { deleteCartItem, handleGetCartInfo } from "../../api/cart";
import { message } from "antd";

const Body = ({ authState }) => {
    const [items, setItems] = useState([]);
    const [address, setAddress] = useState([]);
    var count = 0;
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
    }, [authState, count]);

    useEffect(() => { }, [items, count])

    const deleteItem = async (id) => {
        try {
            const response = await deleteCartItem(authState.id, id);
            if (response === "Success") {
                message.success("Đã xóa", 2);
                count++;
            } else {
                message.error("Xóa thất bại", 2);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: '#D9D9D9', padding: '10px'}}>
                <span>Địa chỉ nhận hàng: </span>
                <span>
                    <a href="">Thay đổi</a>
                </span>
                <p>{address}</p>
            </div>
            <div>
                <Table_product data={items} deleteItem={deleteItem}/>
            </div>
        </div>
    )
}
export default Body;