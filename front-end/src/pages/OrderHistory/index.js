import React from 'react';
import { Space, Table, Tag } from 'antd';

const columns = [
    {
        title: 'Order ID',
        dataIndex: 'order_id',
        key: 'order_id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'created_at',
    }
];

const data = [
    {
        "order_id": 1,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 2,
        "created_at": "Sat Jul 08 2023 21:23:11 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 1,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 3,
        "created_at": "Sat Jul 08 2023 21:23:11 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 1,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sat Jul 08 2023 21:23:11 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 2,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 3,
        "created_at": "Sat Jul 08 2023 21:26:39 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 3,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 3,
        "created_at": "Sat Jul 08 2023 22:01:44 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 4,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sat Jul 08 2023 22:06:00 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 5,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 3,
        "created_at": "Sat Jul 08 2023 22:12:37 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 5,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sat Jul 08 2023 22:12:37 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 6,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sat Jul 08 2023 22:13:00 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 7,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sat Jul 08 2023 22:13:22 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 9,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sat Jul 08 2023 23:12:58 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 10,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sat Jul 08 2023 23:13:13 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 11,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 11:08:19 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 12,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 2,
        "created_at": "Sun Jul 09 2023 15:05:46 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 13,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 15:33:01 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 14,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 15:37:48 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 16,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 16:57:14 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 16,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 3,
        "created_at": "Sun Jul 09 2023 16:57:14 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 17,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 16:59:21 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 17,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 16:59:21 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 17,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 16:59:21 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 18,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 17:08:36 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 18,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 17:08:36 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 18,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 17:08:36 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 19,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 10,
        "created_at": "Sun Jul 09 2023 17:09:09 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 19,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 6,
        "created_at": "Sun Jul 09 2023 17:09:09 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 20,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 17:19:57 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 20,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 17:19:57 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 21,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 09 2023 17:24:29 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 21,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 3,
        "created_at": "Sun Jul 09 2023 17:24:29 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 23,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 2,
        "created_at": "Sun Jul 16 2023 16:21:08 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 23,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 5,
        "created_at": "Sun Jul 16 2023 16:21:08 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 25,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sun Jul 16 2023 17:54:28 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 26,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 16 2023 17:55:11 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 26,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sun Jul 16 2023 17:55:11 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 27,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sun Jul 16 2023 17:57:33 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 28,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 3,
        "created_at": "Sun Jul 16 2023 18:31:07 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 28,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 5,
        "created_at": "Sun Jul 16 2023 18:31:07 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 29,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 3,
        "created_at": "Sun Jul 16 2023 20:39:36 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 29,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 5,
        "created_at": "Sun Jul 16 2023 20:39:36 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 30,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:40:13 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 30,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 5,
        "created_at": "Sat Jul 22 2023 15:40:13 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 30,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:40:13 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 31,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:40:47 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 31,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:40:47 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 31,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:40:47 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 32,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:50:37 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 32,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:50:37 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 33,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:59:24 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 33,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 15:59:24 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 34,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 16:00:35 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 34,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 16:00:35 GMT+0700 (Indochina Time)"
    },
    {
        "order_id": 34,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 1,
        "created_at": "Sat Jul 22 2023 16:00:35 GMT+0700 (Indochina Time)"
    }
];

const OrderHistory = ({ authState }) => {
    return (
        <div style={{ margin: '20px' }}>
            <h2>Lịch sử đặt hàng</h2>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default OrderHistory;