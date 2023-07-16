import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, InputNumber, Tooltip, message } from 'antd';
import '../../asset/styles.css';

function Body({ isLoggedIn }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [images, setImages] = useState([]);
    const [infos, setInfos] = useState([]);
    const [number, setNumber] = useState(1); // number of product
    const [address, setAddress] = useState('');
    
    const changeNumber = (num) => {
        setNumber(num);
    }

    const addToCart = async (userId, productId, quantity) => {
        var formData = {
            userId: userId,
            productId: productId,
            quantity: quantity,
        }

        try {
            const response = await axios.post("http://localhost:5000/users/cart", formData);
            if (response.status === 200) {
                message.success("Thêm giỏ thành công !");
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const getAddress = async () => {
            if (isLoggedIn.message === true) {
                const response = await axios.get(`http://localhost:5000/users/${isLoggedIn.id}/address`);
                var addr = response.data[0].address + ', ' + response.data[0].city;
                setAddress(addr);
            }
        };

        const getProductInfo = async () => {
            const response = await axios.get(`http://localhost:5000/products/${id}/detail`);
            setInfos(response.data);
        };

        const getImages = async () => {
            const response = await axios.get(`http://localhost:5000/products/${id}/image`);
            setImages(response.data);
        };

        getAddress();
        getProductInfo();
        getImages();

    }, [isLoggedIn])

    return (
        <div className='container-body-cd'>
            <Card style={{ backgroundColor: '#CCCCCC' }}>
                <div className='display-content'>
                    <Card>
                        <img src={images[0]?.image} alt="Main Image" className="main-image" />
                        <div style={{ display: 'flex' }}>
                            {images.slice(1).map((image, index) => (
                                <div key={image.id} className="thumbnail-images">
                                    <img key={index} src={image.image} alt="Thumbnail 1" className="thumbnail-image" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card style={{ padding: '10px', marginLeft: '20px' }}>
                        {infos.map((info) => (
                            <div key={info.id}>
                                <h1>{info.name}</h1>
                                <h3>{info.description}</h3>
                                <p>Giá: {info.price} VND</p>
                                Số lượng:
                                <InputNumber className='input-number' addonAfter="VND" defaultValue={1} onChange={(value) => changeNumber(value)} />
                                (có tổng {info.quantity} sản phẩm trong kho)
                                {isLoggedIn.message ? (
                                    <div>
                                        <p>Vận chuyển tới: {address}</p>
                                        <div className='display-center' >
                                            <Button type="primary" danger onClick={() => addToCart(isLoggedIn.id, info.id, number)}>
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

export default Body;
