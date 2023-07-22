import { Button, Card } from 'antd';
import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { handleAddToCart } from '../api/cart';
const { Meta } = Card;

const DisplayCart = ({ title, objects, authState }) => {
    const navigate = useNavigate();
    const addToCart = (userId, productId, quantity) => {
        var formData = {
            userId: userId,
            productId: productId,
            quantity: quantity,
        }

        handleAddToCart(formData);
    };
    const getProductDetail = (id) => {
        navigate(`/products/${id}`);
    };
    return (
        <div>
            <h3>{title}</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: 10 }}>
                {objects.map((object) => (
                    <div key={object.id}>
                        <Card
                            hoverable
                            onClick={(e) => {
                                e.stopPropagation();
                                getProductDetail(object.product_id);
                            }}
                            style={{
                                width: 180,
                            }}
                            cover={<img alt="example" src={object.image} />}
                            key={object.id}
                        >
                            <Meta title={object.name} description="" />
                            <p>Price: {object.price} VND</p>
                            <a onClick={
                                (e) => {
                                    e.stopPropagation();
                                    addToCart(authState.id, object.product_id, 1);
                                }
                            }><Button type="primary">Thêm vào giỏ</Button>
                            </a>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DisplayCart;