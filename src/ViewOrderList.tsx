import Footer from "./Footer";
import Header from "./Header";
import "./ViewOrderList.css";
import Top from "./Top";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { iOrder } from "./type";
import { Link } from "react-router-dom";

function ViewOrderList() {
    const [orders, setOrders] = useState<iOrder[]>([]);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("accessToken")
        );
        const requestOptions: any = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("/api/sale/list-order", requestOptions)
            .then(response => response.json())
            .then(result => {
                setOrders(result);
            })
            .catch(error => console.log('error', error));
    },[]);

    return (
        <div className="list__order">
            <Top />
            <Header />
            <h2 className="banner__order__detail">Danh sách đơn hàng</h2>
            <div className="list__order__pageMain">
            <table className="table table-striped" style={{margin: '1rem 3rem'}}>
                <thead>
                    <tr>
                        <th scope="col">Mã đặt hàng</th>
                        <th scope="col">Khách hàng</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        const formattedPrice = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(order.totalPrice);
                        return(
                            <tr>
                                <th scope="row">{order.id}</th>
                                <td>{order.user.fullName}</td>
                                <td>{order.totalQuantity}</td>
                                <td>{formattedPrice}</td>
                                <td>{order?.orderDate && new Date(order.orderDate).toLocaleString()}</td>
                                <td style={{ fontWeight: 'bold', color: order.orderStatus ==='accepted' ? 'green' : order.orderStatus === 'progressing' ? '#F2AF13' : 'red' }}>
                                    {order.orderStatus === 'accepted'
                                        ? 'Đã xử lý'
                                        : order.orderStatus === "progressing"
                                            ? 'Chờ xác nhận'
                                        : 'Đã hủy'
                                    }
                                </td>
                                <td>
                                    <Link to={`/order-detail/${order.id}`}>Xem chi tiết</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
            <nav className="pages" aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <Link to="#" className="page-link" tabIndex={-1} style={{color:'black'}}>Trang đầu</Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link" style={{color:'black'}}>1</Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link" style={{color:'black'}}>2</Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link" style={{color:'black'}}>3</Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link" style={{color:'black'}}>Trang cuối</Link>
                    </li>
                </ul>
            </nav>
            <Footer />
        </div>
    );
}

export default ViewOrderList;