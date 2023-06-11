import { DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PhoneOutlined, } from '@ant-design/icons';
import { FaRobot, FaTshirt, FaHighlighter, FaShoppingBag, FaRing } from "react-icons/fa";
import { Button, Menu, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles.css'

const { Meta } = Card;
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Đồ chơi', '1', <FaRobot />),
    getItem('Máy tính', '2', <DesktopOutlined />),
    getItem('Điện thoại', '3', <PhoneOutlined />),
    getItem('Thời trang', '5', <FaTshirt />),
    getItem('Làm đẹp', '6', <FaHighlighter />),
    getItem('Balo', '7', <FaShoppingBag />),
    getItem('Trang sức', '8', <FaRing />),
];


const App = () => {

    /* 
    biến state jsonData sẽ được cập nhật 
    khi nhận được dữ liệu từ API và khi biến state thay đổi, 
    component sẽ được render lại để hiển thị dữ liệu mới. 
    */
    const [objects, setObjects] = useState([]);
    const [randomProducts, setRandomProduct] = useState([]);
    /* 
    Lưu ý rằng trong cả hai ví dụ trên, chúng ta đã sử dụng window.addEventListener 
    và window.removeEventListener để thêm và xóa sự kiện load vào window. 
    Điều này đảm bảo rằng chúng ta chỉ gọi hàm handleWindowLoad một lần 
    khi component được tải và tránh gọi lại nếu component được render lại.
    */

    useEffect(() => {
        window.addEventListener("load", handleWindowLoad);
        return () => {
            window.removeEventListener("load", handleWindowLoad);
        };
        // handleWindowLoad();

    }, []);

    const handleWindowLoad = () => {
        axios.get("http://localhost:5000/data/getpriority")
            .then(response => {
                // Xử lý dữ liệu nhận được từ API
                setObjects(response.data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
            });

        axios.get("http://localhost:5000/data/getrandom")
            .then(response => {
                setRandomProduct(response.data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
            });
    }

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div style={{ display: 'flex' }}>
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
                    // defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
            <div style={{ flex: '9' }}>
                <h3>Các sản phẩm nổi bật</h3>
                <div style={{ overflowX: 'auto', maxWidth: '1287px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {objects.map((object) => (
                            <Card
                                hoverable
                                style={{
                                    width: 180,
                                }}
                                cover={<img alt="example" src={object.image} />}
                                key={object.id}
                            >
                                <Meta title={object.name} description="" />
                                <p>Price: {object.price} VND</p>
                                <a href="http://localhost:3000/signin"><Button type="primary">Thêm vào giỏ</Button></a>
                            </Card>
                        ))}
                    </div>
                </div>
                <h3>Có thể bạn quan tâm</h3>
                <div >
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {randomProducts.map((randomProduct) => (
                            <Card
                                hoverable
                                style={{
                                    width: 164,
                                }}
                                cover={<img alt="example" src={randomProduct.image} />}
                                key={randomProduct.id}
                            >
                                <Meta title={randomProduct.name} description="" />
                                <p>Price: {randomProduct.price} VND</p>
                                <a href="http://localhost:3000/signin"><Button type="primary">Thêm vào giỏ</Button></a>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default App;