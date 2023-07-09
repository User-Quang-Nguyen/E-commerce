import { useEffect, useState } from "react";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import axios from "axios";

const Cart = ({ isLoggedIn }) => {
    const [total, setTotal] = useState();
    const [onChange, setOnChange] = useState(0);
    useEffect(() => {
        var totalMoney = `http://localhost:5000/users/${isLoggedIn.id}/cart/total`;
        axios.get(totalMoney)
            .then((response) => {
                var num = 0;
                response.data.map((obj) => {
                    num = num + obj.quantity * obj.price;
                })
                setTotal(num)
            })
            .catch((error) => { console.log(error) })
    }, [total, isLoggedIn])
    console.log(total);
    return (
        <div>
            <Header />
            <Body isLoggedIn={isLoggedIn} />
            <Footer total={total} ship={20000} vou={-20000} userId={isLoggedIn.id} />
        </div>
    )
}

export default Cart;