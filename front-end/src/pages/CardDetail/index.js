import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, InputNumber, Tooltip } from 'antd';
import { sendToken } from '../../functions/function';
import './styles.css';

function CardDetail() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [images, setImages] = useState([]);
    const [infos, setInfos] = useState([]);
    const [number, setNumber] = useState(null); // number of product
    const [address, setAddress] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState();
    const changeNumber = (num) => {
        setNumber(num);
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await sendToken();
                console.log(result);
                setLoggedIn(result.message);
                setUserId(result.result.userID);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        console.log(loggedIn);
        console.log(userId);
        if (loggedIn === true) {
            const apiGetAddressShip = "http://localhost:5000/user/information?id=" + userId;
            axios.get(apiGetAddressShip)
                .then(response => {
                    console.log(response.data);
                    var addr = response.data.address + response.data.city;
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
                // console.log(response.data);
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

    }, [])

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

                            </div>
                        ))}
                        <p>Vận chuyển tới: {address}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                            <Button type="primary" danger onClick={() => alert("Thêm giỏ")}>
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    );
}

export default CardDetail;
