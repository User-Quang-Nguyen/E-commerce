import { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import Body from "./body";
import Footer from "./footer";
import axios from "axios";

const Cart = ({ isLoggedIn }) => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const getCartTotal = async () => {
            const response = await axios.get(`http://localhost:5000/users/${isLoggedIn.id}/cart/total`);
            setTotal(response.data);
        };
        try {
            getCartTotal();
        } catch (err) {
            console.log(err);
        }
    }, [total, isLoggedIn])

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <Body isLoggedIn={isLoggedIn} />
            <Footer total={total} ship={20000} vou={-20000} userId={isLoggedIn.id} />
        </div>
    )
}

export default Cart;