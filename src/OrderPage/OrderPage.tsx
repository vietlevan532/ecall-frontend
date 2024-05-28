import Footer from "../Footer";
import Header from "../Header";
import "./OrderPage.css";
import Top from "../Top";
import { useState, useEffect } from "react";
import { iCart } from "../type";
import { iCartItem, iOrderDetail } from "../type";
import { useHistory } from "react-router";

function OrderPage() {
    interface iProvince {
        name: string;
        code: number;
    }

    interface iDistrict {
        name: string;
        code: number;
        province_code: number;
        districts: iDistrict[];
    }

    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [detailAddress, setDetailAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [isMissingField, setIsMissingField] = useState<boolean>(false);

    const [provinces, setProvinces] = useState<iProvince[]>([]);
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<number | null>(null);
    const [districts, setDistricts] = useState<iDistrict[]>([]);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState<number | null>(null);
    const [cart, setCart] = useState<iCart>();

    const history = useHistory();

    console.log(cart);
    console.log('User: ', cart?.cartItems);

    function convertToOrderDetails(cartItems: iCartItem[]): iOrderDetail[] {
        return cartItems.map(item => ({
            quantity: item.quantity,
            totalPrice: item.totalPrice,
            unitPrice: (item.totalPrice / item.quantity),
            product: item.product, 
            id: null,
            order: null
        }));
    }

    // Helper function to get province name from code
    const getProvinceName = (code: number | null): string => {
        const province = provinces.find((p) => p.code === code);
        return province ? province.name : '';
    };

    // Helper function to get district name from code
    const getDistrictName = (code: number | null): string => {
        const district = districts.find((d) => d.code === code);
        return district ? district.name : '';
    };

    const handleOrderSubmit = () => {
        if (
            name.trim().length === 0 ||
            phone.trim().length === 0 ||
            selectedProvinceCode === (null || 0) ||
            selectedDistrictCode === (null || 0) ||
            detailAddress.trim().length === 0
        ) {
            setIsMissingField(true);
            return;
        } else {
            setIsMissingField(false);
        }
        setIsMissingField(false);
        const orderDTO = { 
            fullName: name, 
            phoneNumber: phone, 
            city: getProvinceName(selectedProvinceCode), 
            district: getDistrictName(selectedDistrictCode), 
            detailAddress: detailAddress, 
            email: email,
            notes: notes, 
            orderDate: Date.now(),
            totalQuantity: cart?.totalItems,
            totalPrice: cart?.totalPrice,
            orderDetails: cart?.cartItems ? convertToOrderDetails(cart.cartItems) : [],
            orderStatus: 'progressing',
            user: cart?.user 
        } 
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(orderDTO),
        };
        
        fetch('/api/order/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                history.push('/order-successfully');
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        var myHeader = new Headers();
        myHeader.append(
            "Authorization",
            "Bearer " + localStorage.getItem("accessToken")
        );
        const requestOptions: any = {
            method: 'GET',
            headers: myHeader,
            redirect: 'follow'
        };

        fetch("/api/cart/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCart(result);
            })
            .catch(error => console.log('error', error));
    }, []);

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/")
        .then(response => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => setProvinces(data))
        .catch(error => console.error("Error fetching provinces:", error));
    }, []);

    useEffect(() => {
        if (selectedProvinceCode !== null && selectedProvinceCode !== 0) {
            fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    const { districts } = data;
                    setDistricts(districts);
                })
                .catch(error => console.error("Error fetching districts:", error));
        } else {
            setDistricts([]);
        }
    }, [selectedProvinceCode]);

    return (
        <div className="order_page">
            <Top />
            <Header />
            <h2 className="banner_oder">Thông tin đặt hàng</h2>
            <div className="order__pageMain">
                <div className="left_content">
                    <form className="customer_info_form">
                        <h2>Thông tin giao hàng</h2>
                        <div className="order_input">
                            <span>
                                Họ tên
                                <b style={{ color: "red" }}>*</b>    
                            </span>
                            <div className="order_inputAndError">
                                <input
                                    type="text"
                                    placeholder="Nhập họ tên"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    />
                                {isMissingField ? (
                                    <p>
                                        Họ tên không được để trống
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        
                        <div className="order_input">
                            <span>
                                Số điện thoại
                                <b style={{ color: "red" }}>*</b>    
                            </span>
                            <div className="order_inputAndError">
                                <input
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    />
                                {isMissingField ? (
                                    <p>
                                        Số điện thoại không được để trống
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <div className="order_inputSelect">
                            <span>
                            Tỉnh
                            <b style={{ color: "red" }}>*</b>
                            </span>
                            <select
                                name="province"
                                value={selectedProvinceCode || ""}
                                onChange={(e) => setSelectedProvinceCode(Number(e.target.value))}
                                >
                                <option value="">Chọn tỉnh</option>
                                {provinces.map((province) => (
                                    <option key={province.code} value={province.code}>
                                    {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {isMissingField ? (
                            <p style={{ color:'red', fontSize: '13.3px' }}>
                                Vui chọn tỉnh thành
                            </p>
                        ) : null}

                        <div className="order_inputSelect">
                            <span>
                                Quận/huyện
                                <b style={{ color: "red" }}>*</b>    
                            </span>
                            <select
                                name="district"
                                value={selectedDistrictCode || ""}
                                onChange={(e) => setSelectedDistrictCode(Number(e.target.value))}
                                >
                                <option value="">Chọn quận/huyện</option>
                                {districts.map((district: any) => (
                                    <option key={district.code} value={district.code}>
                                    {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {isMissingField ? (
                            <p style={{ color:'red', fontSize: '14px' }}>
                                Vui chọn quận/huyện
                            </p>
                        ) : null}

                        <div className="order_input">
                            <span>
                                Địa chỉ chi tiết
                                <b style={{ color: "red" }}>*</b>    
                            </span>
                            <div className="order_inputAndError">
                                <input
                                    type="text" placeholder="vd: Số nhà, đường, phường/xã..."
                                    value={detailAddress}
                                    onChange={(event) => setDetailAddress(event.target.value)}
                                    />
                                {isMissingField ? (
                                    <p>
                                        Địa chỉ chi tiết không được để trống
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <div className="order_input">
                            <span>
                                Email
                            </span>
                            <div className="order_inputAndError">
                                <input
                                    type="text"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    />
                            </div>
                        </div>

                        <div className="order_input">
                            <span>
                                Ghi chú
                            </span>
                            <div className="order_inputAndError">
                                <input
                                    type="text"
                                    placeholder="Nhập ghi chú"
                                    value={notes}
                                    onChange={(event) => setNotes(event.target.value)}
                                    />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="right_content">
                    <h2>Thông tin sản phẩm</h2>
                    <ul className="list-product-order">
                        <li>
                            <p style={{ marginLeft:'-40px', fontWeight:'bold' }}>Sản phẩm</p>
                            <p style={{ marginLeft:'-15px', fontWeight:'bold' }}>Tên sản phẩm</p>
                            <p style={{ fontWeight:'bold' }}>Số lượng</p>
                            <p style={{ fontWeight:'bold' }}>Đơn giá</p>
                            <p style={{ fontWeight:'bold' }}>Tổng</p>
                        </li>
                        {cart?.cartItems.map((item: any) => {
                            const formattedPrice = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                            }).format(item.totalPrice);
                            return (
                            <li key={item.product.id}>
                                <img style={{boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'}} src={item.product.imageLink} alt="" />
                                <p>{item.product.name}</p>
                                <p>SL: {item.quantity}</p>
                                <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price)}</p>
                                <p>{formattedPrice}</p>
                            </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            
            <div className="btn_checkout">
                <button id="totalPrice_btn">Tổng tiền: {cart?.totalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.totalPrice) : 'N/A'}</button>
                <button id="order_btn" onClick={handleOrderSubmit}>Thanh toán</button>
            </div>

            <Footer />
        </div>
    );
}

export default OrderPage;
