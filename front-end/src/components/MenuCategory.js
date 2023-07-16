import React from "react";
import { Button, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const MenuCategory = ({ toggleCollapsed, collapsed, items }) => {
    return (

        <div
            style={{
                width: 200,
                marginTop: 10,
                flex: '1',
            }}
        >
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                    marginLeft: 10
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    )
}

export default MenuCategory;