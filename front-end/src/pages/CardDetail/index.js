import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckLogin } from '../../functions/function';
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
    const changeNumber = (num) => {
        setNumber(num);
    }

    useEffect(() => {

        // try {
        //     const loggedIn = await CheckLogin();
        //     console.log(loggedIn);
        //     if (loggedIn.message === true) {
        //         const apiGetUserInfo = "http://localhost:5000/user/information?id=" + loggedIn.id;
        //         axios.get(apiGetUserInfo)
        //             .then((response) => {
        //                 var Address = response.data[0].address + ',' + response.data[0].city;
        //                 setAddress(Address);
        //             })
        //             .catch((error) => {
        //                 console.error(error);
        //             })
        //     } else {
        //         console.log("Chưa đăng nhập");
        //     }
        // } catch (error) {
        //     console.log("Error");
        // }



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
                                <p>Số lượng:
                                    <InputNumber style={{ width: '150px', height: 'auto', margin: '0px 20px' }} addonBefore="+" addonAfter="VND" defaultValue={1} onChange={(value) => changeNumber(value)} />
                                    (có tổng {info.quantity} sản phẩm trong kho)
                                </p>
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
