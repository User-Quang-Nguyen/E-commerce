import { useEffect, useState } from "react";
import Body from "./body";
import PaymentInfo from "./PaymentInfo";
import { getTotalMoney } from "../../api/cart";

const Cart = ({ authState }) => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (!authState.id) return;
        const getCartTotal = async () => {
            const response = await getTotalMoney(authState.id);
            setTotal(response);
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
            <PaymentInfo total={total} ship={20000} vou={20000} userId={authState.id} />
        </div>
    )
}

export default Cart;