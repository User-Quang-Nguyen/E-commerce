import React from "react";
import myLogo from "../../pages/HomePage/logo192.png"
import { Col, Row } from "antd";
import '../../styles.css'


const Header = () => {
    return (
        <div className="header" style={{ backgroundColor: '#001529', marginBottom: '10px', marginTop: '10px' }}>
            <Row>
                <Col>
                    <div>
                        <img className="logo" src={myLogo}></img>
                    </div>
                </Col>
                <Col>
                    <div className="title">
                        <h2>Xem giỏ hàng</h2>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Header;