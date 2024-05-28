import Footer from "../Footer";
import './StoreSystem.css';
import {useState} from "react";
import {Link} from "react-router-dom";

const provinceList = [
    'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cần Thơ', 'Cao Bằng', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'TP Hồ Chí Minh', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
];

const storeList = [
    {
        location: "194 Lê Duẩn, Hà Nội",
        phone: '0982703283',
        workTime: "8h30 - 21h30",
    },
    {
        location: "392 Cầu Giấy, Hà Nội",
        phone: '0982703283',
        workTime: "8h20 - 21h30",
    },
    {
        location: "12 Điện Biên Phủ, Hà Nội",
        phone: '0982703283',
        workTime: "8h30 - 21h00",
    }
]

export default function StoreSystem() {
    const [province, setProvince] = useState('Lựa chọn tỉnh thành phố');

    function handleSelectProvince(e: any) {
        setProvince(e.target.value);
    }

    return (
        <div>
            <Link className='button-back-home' to="/">
                <button> {"<< "}Về trang chủ</button>
            </Link>
            <div className="dropdown">
                <button className='dropdown-button'>{province}</button>
                <div className="dropdown-content">
                    {provinceList.map((province) => {
                        return <button value={province} onClick={handleSelectProvince}>{province}</button>
                    })}
                </div>
            </div>
            <div className='store-container'>
                {storeList.length > 0 && storeList.map((store: any) => {
                    return (
                        <div className="store-excerpt">
                            <p>{store.location}</p>
                            <p>ĐT: {store.phone}</p>
                            <p>HĐ: {store.workTime}</p>
                        </div>
                    )
                })}
            </div>
            <Footer />
        </div>
    )
}