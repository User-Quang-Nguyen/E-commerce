import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { HandleGetOrder } from "../../api/order";

const OrderHistory = ({ authState }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const handleGetOrder = async () => {
            if (!authState.id) return;
            const result = await HandleGetOrder(authState.id);
            setData(result.data);
        };
        try {
            handleGetOrder();
        } catch (e) {
            console.error(e);
        }
    }, [authState.id])

    const firstLevelColumns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Total Money',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
    ]
    const secondLevelColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
    ]
    const firstExpandedRow = (record) => {
        let dt = []
        record.secondLevel.map((scl) => {
            dt.push(scl);
        })
        return (
            <Table
                rowKey={record => record.cardholderid}
                columns={secondLevelColumns}
                dataSource={dt}
                pagination={false}
            />
        )
    }
    return (
        <div className='container mt-40 mb-40 overflow-x-auto tableContainer'>
            <Table
                dataSource={data}
                columns={firstLevelColumns}
                loading={data ? false : true}
                pagination={false}
                expandable={{
                    expandedRowRender: firstExpandedRow,
                    defaultExpandAllRows: false
                }}
            />
        </div>
    )
}

export default OrderHistory;