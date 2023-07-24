import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Col, Row, Select, Button } from "antd";
import { sum, mul } from "../../service/math";
import { handleOrder } from "../../api/cart";

const handleChange = (value) => {
    console.log(value);
};

const PaymentInfo = ({ total, ship, vou, userId }) => {
    const navigate = useNavigate();
    const order = async () => {
        handleOrder(userId);
        navigate('/');
    };

    const cancel = async () => {
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
                        <Button type="primary" onClick={order} >
                            Đặt hàng
                        </Button>
                        <Button type="primary" danger onClick={cancel}>
                            Cancel
                        </Button>
                    </p>
                </Col>
            </Row>
        </div>
    )
}
export default PaymentInfo;