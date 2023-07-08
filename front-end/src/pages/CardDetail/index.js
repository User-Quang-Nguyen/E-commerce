import React from "react";
import Header from "../HomePage/HomeHeader"
import Body from './body'

const CartDetail = ({ isLoggedIn }) => {
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <Body isLoggedIn={isLoggedIn} />
        </div>
    )
}

export default CartDetail;