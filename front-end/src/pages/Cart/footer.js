import React, { useState } from "react";
import { Col, Row, Select, Button, message } from "antd";
import axios from "axios";
import { sum, mul } from "../../functions/math";
import sleep from '../../functions/function'

const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};


const Footer = ({ total, ship, vou, userId }) => {

    const handleOk = () => {
        axios.post(`http://localhost:5000/cart/users/${userId}/setorder`)
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error) })

        axios.delete(`http://localhost:5000/cart/users/${userId}/delete`)
            .then(async (response) => {
                message.success("Đặt hàng thành công!", 2);
                await sleep(2000);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                message.error("Đặt hàng thất bại!");
            })
    }

    const handleCancel = () => {
        axios.delete(`http://localhost:5000/cart/users/${userId}/delete`)
            .then((response) => {
                window.location.href = '/';
            })
            .catch((error) => {
                console.log(error);
            })
    }

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