import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Col, Row, Select, Button, message } from "antd";
import axios from "axios";
import { sum, mul } from "../../functions/math";
import sleep from '../../functions/handleToken'

const handleChange = (value) => {
    console.log(value);
};

const PaymentInfo = ({ total, ship, vou, userId }) => {
    const navigate = useNavigate();
    const handleOk = async () => {
        try {
            const orderResponse = await axios.post(`http://localhost:5000/users/${userId}/cart/order`);
            message.success("Đặt hàng thành công!", 2);
            await sleep(2000);
            navigate("/");
        } catch (error) {
            message.error("Đặt hàng thất bại!");
        }
    };

    const handleCancel = async () => {
        navigate('/');
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
                            Cancel
                        </Button>
                    </p>
                </Col>
            </Row>
        </div>
    )
}
export default PaymentInfo;