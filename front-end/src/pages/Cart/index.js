import { useEffect, useState } from "react";
import Body from "./body";
import PaymentInfo from "./PaymentInfo";
import axios from "axios";

const Cart = ({ authState }) => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const getCartTotal = async () => {
            const response = await axios.get(`http://localhost:5000/users/${authState.id}/cart/total`);
            setTotal(response.data);
        };
        try {
            getCartTotal();
        } catch (err) {
            console.log(err);
        }
    }, [total, authState])

    return (
        <div>
            <Body authState={authState} />
            <PaymentInfo total={total} ship={20000} vou={-20000} userId={authState.id} />
        </div>
    )
}

export default Cart;