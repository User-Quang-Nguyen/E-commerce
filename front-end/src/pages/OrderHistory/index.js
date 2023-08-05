import React from "react";
import { Table } from "antd";

const App = () => {
    const fakeFirstLevelData = [
        {
            key: 1,
            total: 100000,
            created_at: '2014-12-24 23:12:00',
            secondLevel: [{
                key: 1,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 1',
                price: 200,
                quantity: 2,
            }, {
                key: 2,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 2',
                price: 200,
                quantity: 2,
            }, {
                key: 3,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 3',
                price: 200,
                quantity: 2,
            }]
        }, {
            key: 2,
            total: 200000,
            created_at: '2014-12-24 23:12:00',
            secondLevel: [{
                key: 1,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 3',
                price: 200,
                quantity: 2,
            }, {
                key: 2,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 4',
                price: 200,
                quantity: 2,
            }, {
                key: 3,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 5',
                price: 200,
                quantity: 2,
            }]
        }, {
            key: 3,
            total: 300000,
            created_at: '2014-12-24 23:12:00',
            secondLevel: [{
                key: 1,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 6',
                price: 200,
                quantity: 2,
            }, {
                key: 2,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 7',
                price: 200,
                quantity: 2,
            }, {
                key: 3,
                created_at: '2014-12-24 23:12:00',
                name: 'Don hang 8',
                price: 200,
                quantity: 2,
            }]
        }
    ]

    const firstLevelColumns = [
        {
            title: 'No.',
            dataIndex: 'stt',
            key: 'stt',
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
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
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
        let data = []
        record.secondLevel.map((scl) => {
            data.push(scl);
        })
        return (
            <Table
                rowKey={record => record.cardholderid}
                columns={secondLevelColumns}
                dataSource={data}
                pagination={false}
            />
        )
    }

    return (
        <div className='container mt-40 mb-40 overflow-x-auto tableContainer'>
            <Table
                dataSource={fakeFirstLevelData}
                columns={firstLevelColumns}
                loading={fakeFirstLevelData ? false : true}
                pagination={false}
                expandable={{
                    expandedRowRender: firstExpandedRow,
                    defaultExpandAllRows: false
                }}
            />
        </div>
    )
}

export default App;