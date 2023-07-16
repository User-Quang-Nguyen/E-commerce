import { FaRobot } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../asset/styles.css';
import DisplayCard from '../../components/DisplayCard';
import MenuCategory from '../../components/MenuCategory';

const getProducts = async (url, setProducts) => {
    try {
        const response = await axios.get(url);
        setProducts(response.data);
    } catch (error) {
        console.error(error);
    }
};

function getItem(label, key, icon) {
    return { key, icon, label };
}

const HomeBody = ({ isLoggedIn }) => {
    const [categories, setCategory] = useState([]);
    const [objects, setObjects] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [randomProducts, setRandomProduct] = useState([]);

    useEffect(() => {
        getProducts("http://localhost:5000/products/popular", setObjects);
        getProducts("http://localhost:5000/products/normal", setRandomProduct);
        getProducts("http://localhost:5000/products/category", setCategory);
    }, []);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const items = categories.map((category) => (
        getItem(category.category_name, category.id, <FaRobot />)
    ));

    return (
        <div style={{ display: 'flex' }}>
            <MenuCategory toggleCollapsed={toggleCollapsed} collapsed={collapsed} items={items} />

            <div style={{ flex: '9' }}>
                <DisplayCard title="Các sản phẩm nổi bật" objects={objects} isLoggedIn={isLoggedIn} />
                <DisplayCard title="Có thể bạn quan tâm" objects={randomProducts} isLoggedIn={isLoggedIn} />
            </div>
        </div >
    );
};
export default HomeBody;