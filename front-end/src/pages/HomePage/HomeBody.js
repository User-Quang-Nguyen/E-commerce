import { DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PhoneOutlined, } from '@ant-design/icons';
import { FaRobot, FaTshirt, FaHighlighter, FaShoppingBag, FaRing } from "react-icons/fa";
import { Button, Menu, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles.css';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
function getItem(label, key, icon) {
    return {
        key,
        icon,
        label,
    };
}

const HomeBody = ({ isLoggedIn }) => {

    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [categories, setCategory] = useState([]);
    const [objects, setObjects] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [randomProducts, setRandomProduct] = useState([]);

    useEffect(() => {
        handleWindowLoad();
    }, []);

    const handleWindowLoad = () => {

        // Get a list of popular products
        axios.get("http://localhost:5000/product/popular")
            .then(response => {
                // Xử lý dữ liệu nhận được từ API
                setObjects(response.data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
            });

        // Get regular product list
        axios.get("http://localhost:5000/product/normal")
            .then(response => {
                setRandomProduct(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // Get a list of product categories
        axios.get("http://localhost:5000/product/category")
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getProductDetail = (id) => {
        navigate("/products?id=" + id);
    }

    const items = categories.map((category) => (
        getItem(category.category_name, category.id, <FaRobot />)
    ));

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
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
            <div style={{ flex: '9' }}>
                <h3>Các sản phẩm nổi bật</h3>
                <div style={{ overflowX: 'auto', maxWidth: '1287px' }}>
                    <div style={{ display: 'flex', gap: '16px', padding: '10px' }}>
                        {objects.map((object) => (
                            <div key={object.id}>
                                {/* <Link key={object.id} to={`/products?id=${object.id}`}></Link> */}
                                <Card
                                    hoverable
                                    onClick={() => getProductDetail(object.id)}
                                    style={{
                                        width: 180,
                                    }}
                                    cover={<img alt="example" src={object.image} />}
                                    key={object.id}
                                >
                                    <Meta title={object.name} description="" />
                                    <p>Price: {object.price} VND</p>
                                    <a href=""><Button type="primary">Thêm vào giỏ</Button></a>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <h3>Có thể bạn quan tâm</h3>
                <div >
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: 10 }}>
                        {randomProducts.map((randomProduct) => (
                            <div key={randomProduct.id}>
                                {/* <Link key={randomProduct.id} to={`/products?id=${randomProduct.id}`}></Link> */}
                                <Card
                                    hoverable
                                    onClick={() => getProductDetail(randomProduct.product_id)}
                                    style={{
                                        width: 180,
                                    }}
                                    cover={<img alt="example" src={randomProduct.image} />}
                                    key={randomProduct.id}
                                >
                                    <Meta title={randomProduct.name} description="" />
                                    <p>Price: {randomProduct.price} VND</p>
                                    <a href=""><Button type="primary">Thêm vào giỏ</Button></a>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};
export default HomeBody;