import { useHistory } from 'react-router-dom';
import './Product.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { iUser } from './type';

interface iProduct {
    id: number;
    name: string;
    image?: string;
    shortDes: string;
}

function Product( {id, name, image, shortDes}: iProduct ) {

    var ADMIN: string = "ROLE_ADMIN";
    var USER: string = "ROLE_USER";
    var PROVIDER: string = "ROLE_PROVIDER";
    var SALE: string = "ROLE_SALE";

    const [user, setUser] = useState<iUser>();

    const history = useHistory();

    const handleViewDetails = () => {
        history.push(`/products/${id}`);
    };

    useEffect(() => {
      const roleAccess = localStorage.getItem('user');
      if (roleAccess) {
        const authorities = JSON.parse(roleAccess);
        setUser(authorities);
      }
    }, [])

    const redirectToLoginPage = () => {
      history.push('/login');
    };

    const handleAddCartClick = () => {
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
        fetch(`api/cart/add/${id}`, requestOptions)
          .then((response) => {
            alert("Thêm sản phẩm vào giỏ hàng thành công!");
            return response.json();
          })
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      };

    return (
            <div id="card" className="card" style={{width: '100%', margin:'0'}}>
                <img id="image" className="card-img-top" src={image} alt={''}/>
                <div id="card__body" className="card-body">
                    <h5 id='card__title' className="card-title">{name}</h5>
                    <p id='card__text' className="card-text">{shortDes}</p>
                    <button 
                        id="view__detail__btn" 
                        className="btn"
                        onClick={handleViewDetails}>
                        <FontAwesomeIcon icon={faEye}/> Xem chi tiết
                    </button>
                    {
                      (user?.authorities.includes(SALE) ||
                      user?.authorities.includes(ADMIN) ||
                      user?.authorities.includes(PROVIDER)) ? 
                      null :
                      (user?.authorities.includes(USER) ? (
                        <button 
                            id="add__cart__btn" 
                            className="btn"
                            onClick={handleAddCartClick}>
                            <FontAwesomeIcon icon={faCartPlus}/> Thêm vào giỏ hàng
                        </button>
                      ) : (
                        <button 
                            id="add__cart__btn" 
                            className="btn"
                            onClick={redirectToLoginPage}>
                            <FontAwesomeIcon icon={faCartPlus}/> Thêm vào giỏ hàng
                        </button>
                      ))
                    }
                    
                </div>
            </div>
    );
}

export default Product
