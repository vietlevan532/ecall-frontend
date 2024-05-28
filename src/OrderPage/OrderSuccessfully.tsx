import Top from "../Top";
import Header from "../Header";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook } from "@fortawesome/free-solid-svg-icons";
import "./OrderSuccessfully.css";
import { useHistory } from "react-router-dom";
import Product from "../Product";

function OrderSuccessfully() {

    const history = useHistory();

    const orderSuccessPageUrl = () => {
        history.push('/');
    };

    return (
        <div className="order__successfully__page">
            <Top />
            <Header />
            <div className="main_content">
                <div className="thank__you" style={{border:'1px solid #e3e3e3', margin: '20px', backgroundColor: 'white'}}>
                    <h4 id="text__suggestion">ĐẶT HÀNG THÀNH CÔNG</h4>
                    <div className="mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-success bi bi-check-circle-fill" width="75" height="75"
                            fill="currentColor" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                    </div>
                    <div className="text-center" style={{marginBottom: '20px'}}>
                        <h1>Cảm ơn bạn đã ủng hộ <b>"Ecall"</b>!</h1>
                        <p>We've send the link to your inbox. Lorem ipsum dolor sit, </p>
                        <button 
                            className="btn"
                            onClick={orderSuccessPageUrl}
                            style={{backgroundColor:'#F56526', color: 'whitesmoke', marginRight: '8px'}}>
                            <FontAwesomeIcon icon={faHome}/> Về trang chủ
                        </button>
                        <button 
                            className="btn" 
                            style={{backgroundColor:'#F56526', color: 'whitesmoke', marginLeft: '8px'}}>
                            <FontAwesomeIcon icon={faBook}/> Xem đơn hàng
                        </button>
                    </div>
                </div>
                <hr style={{border:'1px solid #e3e3e3', margin: '20px'}}/>
                <div className="product__suggestion" style={{border:'1px solid #e3e3e3'}}>
                    <h4 id="text__suggestion">CÓ THỂ BẠN CŨNG THÍCH</h4>
                    <div className="row" style={{padding:'0 16px', margin: '20px 0'}}>
                        <div className="col-md-3">
                            <Product 
                                id={0}
                                name={'Some quick example text to build on'}
                                image={'https://vuanem.com/blog/wp-content/uploads/2023/02/thuc-an-cho-meo-munckin.jpg'}
                                shortDes={''}
                            />
                        </div>
                        <div className="col-md-3">
                            <div className="card" style={{width: '100%', margin:'0'}}>
                                <img id="image" className="card-img-top" src='https://vuanem.com/blog/wp-content/uploads/2023/02/thuc-an-cho-meo-munckin.jpg' alt={''}/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on</p>
                                    <button id="view__detail__btn" className="btn">Xem chi tiết</button>
                                    <button id="add__cart__btn" className="btn">Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card" style={{width: '100%', margin:'0'}}>
                                <img id="image" className="card-img-top" src='https://vuanem.com/blog/wp-content/uploads/2023/02/thuc-an-cho-meo-munckin.jpg' alt={''}/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on</p>
                                    <button id="view__detail__btn" className="btn">Xem chi tiết</button>
                                    <button id="add__cart__btn" className="btn">Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card" style={{width: '100%', margin:'0'}}>
                                <img id="image" className="card-img-top" src='https://vuanem.com/blog/wp-content/uploads/2023/02/thuc-an-cho-meo-munckin.jpg' alt={''}/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on</p>
                                    <button id="view__detail__btn" className="btn">Xem chi tiết</button>
                                    <button id="add__cart__btn" className="btn">Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card" style={{width: '100%', margin:'0'}}>
                                <img id="image" className="card-img-top" src='https://vuanem.com/blog/wp-content/uploads/2023/02/thuc-an-cho-meo-munckin.jpg' alt={''}/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on</p>
                                    <button id="view__detail__btn" className="btn">Xem chi tiết</button>
                                    <button id="add__cart__btn" className="btn">Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card" style={{width: '100%', margin:'0'}}>
                                <img id="image" className="card-img-top" src='https://vuanem.com/blog/wp-content/uploads/2023/02/thuc-an-cho-meo-munckin.jpg' alt={''}/>
                                <div className="card-body">
                                    <h5 id="card__title" className="card-title">Card title</h5>
                                    <p id="card__text" className="card-text">Some quick example text to build on</p>
                                    <button id="view__detail__btn" className="btn">Xem chi tiết</button>
                                    <button id="add__cart__btn" className="btn">Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card" style={{width: '100%', margin:'0'}}>
                                <img id="image" className="card-img-top" src='https://vuanem.com/blog/wp-content/uploads/2023/02/thuc-an-cho-meo-munckin.jpg' alt={''}/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on</p>
                                    <button id="view__detail__btn" className="btn">Xem chi tiết</button>
                                    <button id="add__cart__btn" className="btn">Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card" style={{width: '100%', margin:'0'}}>
                                <img id="image" className="card-img-top" src='https://vuanem.com/blog/wp-content/uploads/2023/02/thuc-an-cho-meo-munckin.jpg' alt={''}/>
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on</p>
                                    <button id="view__detail__btn" className="btn">Xem chi tiết</button>
                                    <button id="add__cart__btn" className="btn">Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
    
}

export default OrderSuccessfully;
