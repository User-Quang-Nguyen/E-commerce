import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Select, Card, Button } from 'antd';
import { getUserById } from "../../api/user";

const DisplayInfo = ({ authState }) => {
    const [info, setInfo] = useState({});
    useEffect(() => {
        const fetch = async () => {
            if (!authState.id) return;
            const imp = await getUserById(authState.id);
            setInfo(imp[0]);
        }

        try {
            fetch();
        } catch (e) {
            console.log(e);
        }
    }, [authState]);

    return (
        <Card
            title="Profile"
            bordered={true}
            hoverable={true}
            style={{
                width: 600,
            }}
        >
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    width: 700
                }}
            >
                <Form.Item label="First Name">
                    <Input value={info?.first_name} />
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input value={info?.last_name} />
                </Form.Item>
                <Form.Item label="Phone">
                    <Input value={info?.phone_number} />
                </Form.Item>
                <Form.Item label="Address">
                    <Input value={info?.address + ',' + info?.city} />
                </Form.Item>
                <Form.Item label="Gender">
                    <Select value="Male">
                        <Select.Option value="1">Male</Select.Option>
                        <Select.Option value="0">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Birth">
                    <DatePicker />
                </Form.Item>
                <Form.Item >
                    <Button style={{ marginLeft: '420px' }} type="primary">Lưu thay đổi</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default DisplayInfo;
