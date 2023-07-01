import React from "react";
import { Col, Row, Select, Button } from "antd";
import { sum, mul } from "../../functions/math";

const handleChange = (value) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};

const handleOk = () => {
    alert("OK")
}

const handleCancel = () => {
    alert("Cancel")
}

const Footer = ({ total, ship, vou }) => {
    return (
        <div style={{ backgroundColor: '#d9d9d9' }}>
            <Row justify="space-between" style={{ padding: '10px' }}>
                <Col>
                    <p>Phương thức thanh toán</p>
                    <Select
                        labelInValue
                        defaultValue={{ value: 'tructiep', label: 'Thanh toán khi nhận hàng' }}
                        // style={{ width: 120 }}
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
                    <p>Tong tien hang: {total} VND</p>
                    <p>Thue VAT: {mul(total, 0.1)} VND</p>
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
                            Hủy
                        </Button>
                    </p>
                </Col>
            </Row>
        </div>
    )
}
export default Footer;