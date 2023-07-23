import React, { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Select, Card, Button } from 'antd';
import { getUserById } from "../../api/user";
import moment from "moment";

const DisplayInfo = ({ authState }) => {
    const [infos, setInfo] = useState([]);
    const timeString = '';
    const date = '';
    useEffect(() => {
        // getUserById(authState.id)
        //     .then(response => {
        //         setInfo(response);
        //     })
        //     .catch(e => { console.error(e) })
        const fetch = async () => {
            const imp = await getUserById(authState.id);
            setInfo(imp);
        }

        try {
            fetch();
        } catch (e) {
            console.log(e);
        }

        console.log(infos);
    }, [authState]);

    return (
        <Card
            title="Profile"
            bordered={true}
            hoverable={true}
            style={{
                width: 600,
                textAlign: 'center',
                marginTop: '20px',
                marginLeft: '360px'
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
                    // maxWidth: 600,
                    width: 700
                }}
                justifyContent="center"
            >
                <Form.Item label="First Name">
                    <Input value={infos[0]?.first_name} />
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input value={infos[0]?.last_name} />
                </Form.Item>
                <Form.Item label="Phone">
                    <Input value={infos[0]?.phone_number} />
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
