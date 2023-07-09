import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, InputNumber, Tooltip, message } from 'antd';
import './styles.css';

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

    const addToCart = (userId, productId, quantity) => {
        var formData = {
            userId: userId,
            productId: productId,
            quantity: quantity,
        }

        axios.post("http://localhost:5000/cart/addtocart", formData)
            .then((response) => {
                message.success("Thêm giỏ thành công !")
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        if (isLoggedIn.message === true) {
            const apiGetAddressShip = "http://localhost:5000/user/information?id=" + isLoggedIn.id;
            axios.get(apiGetAddressShip)
                .then(response => {
                    var addr = response.data[0].address + ', ' + response.data[0].city;
                    setAddress(addr);
                })
                .catch(error => {
                    console.log(error);
                })
        }

        const apiGetProductDetail = "http://localhost:5000/product/productdetail?id=" + id;
        axios.get(apiGetProductDetail)
            .then(response => {
                setInfos(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        const apiGetImage = "http://localhost:5000/product/productdetail/image?id=" + id;
        axios.get(apiGetImage)
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [isLoggedIn])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#CCFFFF' }}>
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
                                <InputNumber style={{ width: '150px', height: 'auto', margin: '0px 20px' }} addonAfter="VND" defaultValue={1} onChange={(value) => changeNumber(value)} />
                                (có tổng {info.quantity} sản phẩm trong kho)
                                {isLoggedIn.message ? (
                                    <div>
                                        <p>Vận chuyển tới: {address}</p>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                                            <Button type="primary" danger onClick={() => addToCart(isLoggedIn.id, info.id, number)}>
                                                Thêm vào giỏ hàng
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p>Vận chuyển tới: </p>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
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
