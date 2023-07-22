import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, InputNumber, message } from 'antd';
import '../../asset/styles.css';
import { getAddress } from '../../api/user';
import { getProductById } from '../../api/product';
import { handleAddToCart } from '../../api/cart';

function DisplayCardDetail({ authState }) {
    const id = useParams().id;

    const [infos, setInfos] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const addressResponse = await getAddress(authState);
                setAddress(addressResponse);

                const productResponse = await getProductById(id);
                setInfos(productResponse);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [authState])

    const addToCart = async (userId, productId, quantity) => {
        var formData = {
            userId: userId,
            productId: productId,
            quantity: quantity,
        }
        handleAddToCart(formData);
    }

    return (
        <div className='container-body-cd'>
            <Card style={{ backgroundColor: '#CCCCCC' }}>
                <div className='display-content'>
                    <Card>
                        <img src={infos.image[0].image} alt="Main Image" className="main-image" />
                        <div style={{ display: 'flex' }}>
                            {infos.image.slice(1).map((image, index) => (
                                <div key={image.id} className="thumbnail-images">
                                    <img key={index} src={image.image} alt="Thumbnail 1" className="thumbnail-image" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card style={{ padding: '10px', marginLeft: '20px' }}>
                        {infos.info[0].map((info) => (
                            <div key={info.id}>
                                <h1>{info.name}</h1>
                                <h3>{info.description}</h3>
                                <p>Giá: {info.price} VND</p>
                                Số lượng:
                                <InputNumber className='input-number' addonAfter="VND" defaultValue={1} onChange={(value) => setQuantity(value)} />
                                (có tổng {info.quantity} sản phẩm trong kho)
                                {authState.isLoggedIn ? (
                                    <div>
                                        <p>Vận chuyển tới: {address}</p>
                                        <div className='display-center' >
                                            <Button type="primary" danger onClick={() => addToCart(authState.id, info.id, quantity)}>
                                                Thêm vào giỏ hàng
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p>Vận chuyển tới: </p>
                                        <div className='display-center'>
                                            <Button type="primary" danger>
                                                Thêm vào giỏ hàng
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Card>
                </div>
            </Card>
        </div>
    );
}

export default DisplayCardDetail;
