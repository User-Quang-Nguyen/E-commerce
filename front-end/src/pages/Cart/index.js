import React from "react";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

const Cart = () => {
    return (
        <div>
            <Header />
            <Body />
            <Footer total={230000} ship={20000} vou={20000}/>
        </div>
    )
}

export default Cart;