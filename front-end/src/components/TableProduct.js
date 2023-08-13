import React from 'react'
import { Table, InputNumber } from 'antd';
import axios from 'axios';
import { mul } from '../service/math';
import { BASE_URL } from '../api/baseURL';

const Table_product = ({ data, deleteItem }) => {
    const [tableData, setTableData] = React.useState(data);

    React.useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleQuantityChange = async (id, value) => {
        const updatedData = tableData.map((item) => {
            if (item.id === id) {
                const formData = {
                    id: id,
                    quantity: value,
                }
                var query = `${BASE_URL}/users/cartitems`;
                axios.put(query, formData)
                    .then((respone) => {
                    })
                    .catch((error) => { console.log(error) })
                return {
                    ...item,
                    quantity: value,
                };
            }
            return item;
        });

        await setTableData(updatedData);
    };

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => (
                <img style={{ width: '60px' }} src={record.image} alt='Image' />
            )
        },
        {
            title: 'Mô tả',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phân loại',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <InputNumber
                    style={{ width: '100px', height: 'auto' }}
                    addonAfter="VND"
                    defaultValue={record.quantity}
                    onChange={(value) => handleQuantityChange(record.id, value)}
                />
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            render: (text, record) => (
                mul(record.price, record.quantity)
            )
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => <a onClick={() => deleteItem(record.id)}>Delete</a>,
        },
    ];


    return (
        <Table
            columns={columns}
            dataSource={tableData}
        />
    );
}
export default Table_product;