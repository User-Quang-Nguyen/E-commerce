import React, { useEffect, useState } from 'react';
import { getAndSetData } from '../../api/product';
import '../../asset/styles.css';
import DisplayCard from '../../components/DisplayCard';
import MenuCategory from '../../components/MenuCategory';
import { BASE_URL } from '../../api/baseURL';

function getItem(label, key) {
    return { key, label };
}

const HomeBody = ({ authState }) => {
    const [categories, setCategory] = useState([]);
    const [popularProducts, setPopularProduct] = useState([]);
    const [normalProducts, setNormalProduct] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [links, setData] = useState([
        {
            "link": `${BASE_URL}/products/popular`,
            "var": setPopularProduct
        },
        {
            "link": `${BASE_URL}/products/normal`,
            "var": setNormalProduct
        },
        {
            "link": `${BASE_URL}/products/categories`,
            "var": setCategory
        }
    ]);

    useEffect(() => {
        links.map((link) => {
            getAndSetData(link.link, link.var)
        })
    }, []);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ display: 'flex' }}>
            <MenuCategory
                toggleCollapsed={toggleCollapsed}
                collapsed={collapsed}
                items={
                    categories.map((category) => (
                        getItem(category.category_name, category.id)
                    ))
                }
            />

            <div style={{ flex: '9' }}>
                <DisplayCard title="Các sản phẩm nổi bật" objects={popularProducts} authState={authState} />
                <DisplayCard title="Có thể bạn quan tâm" objects={normalProducts} authState={authState} />
            </div>
        </div >
    );
};
export default HomeBody;