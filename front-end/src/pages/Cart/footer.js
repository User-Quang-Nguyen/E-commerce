import React, { useState } from "react";
import { Col, Row, Select, Button, message } from "antd";
import axios from "axios";
import { sum, mul } from "../../functions/math";
import sleep from '../../functions/extension'

const handleChange = (value) => {
    console.log(value);
};

const Footer = ({ total, ship, vou, userId }) => {
    const handleOk = async () => {
        try {
            const orderResponse = await axios.post(`http://localhost:5000/users/${userId}/cart/order`);
            const cartResponse = await axios.delete(`http://localhost:5000/users/${userId}/cart`);

            if (orderResponse.status === 200 && cartResponse.status === 200) {
                message.success("Đặt hàng thành công!", 2);
                await sleep(2000);
                window.location.reload();
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            message.error("Đặt hàng thất bại!");
        }
    };

    const handleCancel = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/users/${userId}/cart`);
            if (response.status === 200) {
                window.location.href = "/";
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ backgroundColor: '#d9d9d9' }}>
            <Row justify="space-between" style={{ padding: '10px' }}>
                <Col>
                    <p>Phương thức thanh toán</p>
                    <Select
                        labelInValue
                        defaultValue={{ value: 'tructiep', label: 'Thanh toán khi nhận hàng' }}
                        onChange={(value) => handleChange(value)}
                        options={[
                            {
                                value: 'atm',
                                label: 'Thanh toán qua thẻ ATM',
                            },
                            {
                                value: 'pay',
                                label: 'Thanh toán ví điện tử',
                            },
                        ]}
                    />
                </Col>
                <Col>
                    <p>Tổng tiền hàng: {total} VND</p>
                    <p>Thuế VAT: {mul(total, 0.1)} VND</p>
                    <p>Phí vận chuyển: {ship} VND</p>
                    <p>Voucher: {vou} VND</p>
                    <span>Tổng thanh toán: </span>
                    <span style={{ color: 'red' }}>
                        {sum(total, mul(total, 0.1), ship, vou)} VND
                    </span>
                    <p>
                        <Button type="primary" onClick={handleOk} >
                            Đặt hàng
                        </Button>
                        <Button type="primary" danger onClick={handleCancel}>
                            Hủy đơn
                        </Button>
                    </p>
                </Col>
            </Row>
        </div>
    )
}
export default Footer;