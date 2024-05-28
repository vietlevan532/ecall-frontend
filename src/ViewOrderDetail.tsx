import Footer from "./Footer";
import Header from "./Header";
import "./ViewOrderDetail.css";
import Top from "./Top";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { iOrder, iUser } from "./type";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilePdf } from "@fortawesome/free-solid-svg-icons";

function ViewOrderDetail() {

    interface iParams {
        orderId : string;
    }

    const [order, setOrder] = useState<iOrder>();
    const [selectedStatus, setSelectedStatus] = useState<string>();
    const [user, setUser] = useState<iUser>();

    const { orderId } = useParams<iParams>();

    useEffect(() => {
        // const loggedInSale = localStorage.getItem("user");
        // if (loggedInSale) {
        //     const foundSale = JSON.parse(loggedInSale);
        //     setUser(foundSale);
        // }
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("accessToken")
        );

        var requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`/api/sale/order-detail/${orderId}`, requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                setOrder(result);
            })
            .catch((error) => console.log("error", error));
    }, [orderId]);

    useEffect(() => {
        if(selectedStatus !== undefined) {
        var orderDTO =  JSON.stringify({
            fullName: order?.fullName,
            orderDate: order?.orderDate,
            orderStatus: selectedStatus
        });
        var requestOptions: RequestInit = {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: orderDTO,
            redirect: "follow",
        };
        fetch(`/api/order/update-status/${orderId}`, requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log("Order update: ", result);
            })
            .catch(error => {
                console.error("Error when you update order status", error);
                alert("Upload status of order failed. Please try again!");
            });
        }
    }, [selectedStatus, orderId, order]);

    return (
        <div className="order__detail">
            <Top />
            <Header />
            <h2 className="banner__order__detail">Chi tiết đơn hàng</h2>
            <div className="activity">
                <Link className="left" to="/list-order" style={{fontWeight:'bold', textDecoration: 'underline'}}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{marginRight:'8px'}}/>
                    Quay lại
                </Link>
                <button className="right" style={{fontWeight:'bold'}}>
                    <FontAwesomeIcon icon={faFilePdf} style={{marginRight:'8px'}}/>
                    Xuất
                </button>
            </div>

            <div className="order__detail__pageMain">
                <table className="table table-bordered" style={{margin: '1rem 3rem'}}>
                    <thead>
                        <tr>
                            <th scope="col" style={{backgroundColor: '#F56526', color:'white'}}>THÔNG TIN ĐẶT HÀNG</th>
                            <th scope="col" colSpan={4} style={{backgroundColor: '#F56526', color:'white'}}>NỘI DUNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">User</th>
                            <td colSpan={4}>{order?.user.fullName}</td>
                        </tr>
                        <tr>
                            <th scope="row">Đặt hàng với tên</th>
                            <td colSpan={4}>{order?.fullName}</td>
                        </tr>
                        <tr>
                            <th scope="row">Địa chỉ</th>
                            <td colSpan={4}>
                                {order?.detailAddress}, {order?.district}, {order?.city}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Số điện thoại</th>
                            <td colSpan={4}>{order?.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td colSpan={4}>{order?.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Ghi chú</th>
                            <td colSpan={4}>{order?.notes}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tổng tiền</th>
                            <td colSpan={4}>{order?.totalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice) : 'N/A'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Đặt hàng lúc</th>
                            <td colSpan={4}>
                                {order?.orderDate 
                                    && new Date(order.orderDate).toDateString()} - {
                                    order?.orderDate 
                                    && new Date(order.orderDate).toLocaleTimeString()}
                            </td>
                        </tr>
                        <tr>
                            <th>Trạng thái</th>
                            <td colSpan={4}>
                                <select 
                                    onChange={(e) => {
                                        const status = e.target.value;
                                        setSelectedStatus(status);
                                    }}
                                    defaultValue={order?.orderStatus}
                                    value={selectedStatus === undefined ? "null" : selectedStatus}>
                                    {order?.orderStatus && (
                                        <option value={order?.orderStatus} style={{ display: 'none' }}>
                                            {order?.orderStatus === "progressing" ? "Chờ xử lý" :
                                                order?.orderStatus === "accepted" ? "Chấp nhận" :
                                                    "Từ chối"}
                                        </option>
                                    )}
                                    <option
                                        value="progressing">
                                        Chờ xử lý
                                    </option>
                                    <option 
                                        value="accepted"
                                        style={{color: 'green'}}>
                                        Chấp nhận
                                    </option>
                                    <option
                                        value="canceled"
                                        style={{color: 'red'}}>
                                        Từ chối
                                    </option>
                                </select>    
                            </td>
                        </tr>
                        
                        <tr>
                            <th scope="row" colSpan={5} style={{backgroundColor: '#F56526', color:'white'}}>DANH SÁCH CÁC SẢN PHẨM ĐÃ ĐẶT HÀNG</th>  {/* note: rowSpan = totalItem + 1 is correct */}
                        </tr>
                        <tr>
                            <td>Mã sản phẩm</td>
                            <td>Tên sản phẩm</td>
                            <td>Đơn giá</td>
                            <td>Số lượng</td>
                            <td>Tạm tính</td>
                        </tr>
                        {order?.orderDetails && order?.orderDetails.map((prod: any) =>{
                            return (
                                <tr>
                                    <td>{prod.product.id}</td>
                                    <td>{prod.product.name}</td>
                                    <td>{prod.product.price}</td>
                                    <td>{prod.quantity}</td>
                                    <td>{prod.totalPrice}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default ViewOrderDetail;