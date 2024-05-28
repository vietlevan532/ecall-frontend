import { useHistory } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import "./CartPage.css";
import Top from "../Top";
import { useEffect, useState } from "react";
import { iCart } from "../type";

function CartPage() {
    const [cart, setCart] = useState<iCart>();
    const history = useHistory();

    console.log(cart);

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
    
    // Function to delete products by id from cart
    const handleDeleteProductsById = (productId: number) => {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("accessToken")
        );

        var requestOptions: RequestInit = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };
        
        fetch(`/api/cart/delete/${productId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return fetch("/api/cart/", {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                        }
                    });
                } else {
                    throw new Error('Xóa sản phẩm khỏi giỏ hàng không thành công');
                }
            })
            .then(response => response.json())
            .then(result => {
                setCart(result);
                history.push("/cart");
                alert("Xóa sản phẩm khỏi giỏ hàng thành công!");

            })
            .catch((error) => console.log(error));
    }

    // Function to add a product by plus button in cart
    const handleAddCartClick = (productId : number) => {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("accessToken")
        );
        myHeaders.append("Content-Type", "application/json");
        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          redirect:"follow"
        }
        fetch(`api/cart/add/${productId}`, requestOptions)
          .then((response) => {
            if (response.ok) {
                return fetch("/api/cart/", {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
            } else {
                throw new Error('Cập nhật số lượng sản phẩm không thành công');
            }
            })
            .then(response => response.json())
            .then(result => {
                setCart(result);
                history.push("/cart");
            })
            .catch((error) => console.log(error));
    };

    // Function to delete a product by minus button in cart
    const handleDeleteOneProductById = (productId: number) => {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("accessToken")
        );

        var requestOptions: RequestInit = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };
        
        fetch(`/api/cart/deleteOneItem/${productId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return fetch("/api/cart/", {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                        }
                    });
                } else {
                    throw new Error('Cập nhật số lượng sản phẩm không thành công');
                }
            })
            .then(response => response.json())
            .then(result => {
                setCart(result);
                history.push("/cart");
            })
            .catch((error) => console.log(error));
    }

    // Redirect function to url: http://localhost:3000/order"
    const handleCheckout = () => {
        history.push('/order');
    };

    return (
        <div className="cart_page">
            <Top />
            <Header />
            <h2 className="banner-cart">Giỏ hàng</h2>
            <div className="cart__pageMain">
                <div className="left-content">
                    <div className="list-product-cart">
                        {cart?.totalItems === 0 ? (
                            <h1 style={{textAlign: 'center', marginTop: '12rem', color:'gray'}}>Không có sản phẩm nào trong giỏ hàng</h1>
                        ): (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col">Lựa chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.cartItems.map((item: any) => {
                                        const formattedPrice = new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(item.product.price);
                                        return(
                                            <tr>
                                                <th className="align-middle" scope="row"><img src={item.product.imageLink} alt={item.product.name} /></th>
                                                <td className="align-middle">{item.product.name}</td>
                                                <td className="align-middle">
                                                    <p id="quantity__item">
                                                        <span 
                                                            onClick={() => {
                                                                if (item.quantity === 1) {
                                                                    handleDeleteProductsById(item.product.id);
                                                                } else {
                                                                    handleDeleteOneProductById(item.product.id);
                                                                }
                                                            }}
                                                            id="minus__item">
                                                            &#x2013;
                                                        </span>
                                                        {item.quantity}
                                                        <span 
                                                            onClick={() => handleAddCartClick(item.product.id)}  
                                                            id="plus__item">
                                                            &#x2b;
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className="align-middle">{formattedPrice}</td>
                                                <td className="align-middle">
                                                    <p
                                                        style={{color:'red', cursor:'pointer', marginBottom:'0'}} 
                                                        onClick={() => handleDeleteProductsById(item.product.id)}>
                                                        Xóa
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div className="right-content">
                    <h2>Tổng đơn hàng</h2>
                    <hr />
                    <div className="total-summary">
                        <ul>
                            <li>
                                <p>Tạm tính</p>
                                <p>{cart?.totalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.totalPrice) : 'N/A'}</p>
                            </li>
                            <li>
                                <p>Số lượng</p>
                                <p>{cart?.totalItems}</p>
                            </li>
                            <br /> 
                            <hr style={{margin:'0'}} />
                            <li>
                                <h2 className="summaryInCart">Tổng tiền</h2>
                                <h2 className="summaryInCart">{cart?.totalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.totalPrice) : 'N/A'}</h2>
                            </li>
                        </ul>
                    </div>
                    {cart?.totalItems === 0 ? (
                        <button id="checkout__btn" style={{backgroundColor:'gray'}}>Đặt hàng</button>
                    ): (
                        <button id="checkout__btn" onClick={handleCheckout}>Đặt hàng</button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default CartPage;
