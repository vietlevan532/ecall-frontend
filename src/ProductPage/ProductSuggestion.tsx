import { useHistory } from 'react-router-dom';
import './ProductSuggestion.css';
import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { iProduct, iUser } from '../type';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";


export default function ProductSuggestion ({id}:any) {

    var ADMIN: string = "ROLE_ADMIN";
    var USER: string = "ROLE_USER";
    var PROVIDER: string = "ROLE_PROVIDER";
    var SALE: string = "ROLE_SALE";

    const [user, setUser] = useState<iUser>();

    const history = useHistory();

    const [products, setProducts] = useState<iProduct[]>();

    useEffect(() => {
        const roleAccess = localStorage.getItem('user');
        if (roleAccess) {
          const authorities = JSON.parse(roleAccess);
          setUser(authorities);
        }
    }, []);

    const redirectToLoginPage = () => {
        history.push('/login');
      };

    const handleViewDetails = (product_id: any) => {
        history.push(`/products/${product_id}`);
    };

    const handleAddCartClick = (productId: any) => {
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
            alert("Thêm sản phẩm vào giỏ hàng thành công!");
            return response.json();
          })
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      };

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
        fetch(`/api/products/suggestion/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {setProducts(result)})
            .catch((error) => console.log(`/api/products/suggestion/${id}`, error));
    }, [id]);

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
        fetch("/api/products/suggestion", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(!id) {
                    setProducts(result);
                }
            })
            .catch((error) => console.log("/api/products/suggestion", error));
    }, [id]);

    const chunkedProduct: iProduct[][] = products ? Array.from(
        { length: Math.ceil(products.length / 4) }, 
        (_, index) => products.slice(index * 4, (index + 1) * 4)
    ): [];

    const slides = chunkedProduct.map((group, index) => (
        <Carousel.Item key={index}>
            <div className='product__suggestion__content'>
                {group.map((product, cardIndex) => (
                    <div className="card" key={cardIndex} style={{width: '100%', height: '100%'}}>
                        <img style={{width: "100%", height:'55%'}} src={product.imageLink} alt={`CardImageCap ${index}-${cardIndex}`} />
                        <div className="card-body">
                            <h5 id='productName' className="card-title">{product.name}</h5>
                            <p id='shortDes' className="card-text">{product.shortDes}</p>
                            <button 
                                id='btn_viewDetails'
                                className="btn"
                                onClick={() => handleViewDetails(product.id)}>
                                <FontAwesomeIcon icon={faEye}/> Xem chi tiết
                            </button>
                            {
                                (user?.authorities.includes(SALE) ||
                                user?.authorities.includes(ADMIN) ||
                                user?.authorities.includes(PROVIDER)) ? 
                                null :
                                (user?.authorities.includes(USER) ? (
                                    <button 
                                        id='btn_addCart'
                                        className="btn"
                                        onClick={() => handleAddCartClick(product.id)}>
                                        <FontAwesomeIcon icon={faCartPlus}/> Thêm vào giỏ hàng
                                    </button>
                                ) : (
                                    <button 
                                        id='btn_addCart'
                                        className="btn"
                                        onClick={() => redirectToLoginPage}>
                                        <FontAwesomeIcon icon={faCartPlus}/> Thêm vào giỏ hàng
                                    </button>
                                ))
                            }
                            
                        </div>
                    </div>
                ))}
            </div>
        </Carousel.Item>
    ))

    return (
        <div className="product__suggestion">
            <div className="product__suggestion__heading">
                <h3>CÓ THỂ BẠN CŨNG THÍCH</h3>
            </div>
            <Carousel>{slides}</Carousel>
        </div>
    );

}