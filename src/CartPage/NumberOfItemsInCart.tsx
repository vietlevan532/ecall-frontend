import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { iCart } from "../type";

function NumberOfItemsInCart() {

    const [cart, setCart] = useState<iCart>();

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
      }, [cart?.totalItems]);

    return(
        <li style={{margin:'0 20px'}}>
            <Link id="cart-icon" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} className="header__icon" href="/cart" />
                {cart?.totalItems !== 0 && cart?.totalItems !== null && cart ? (
                    <small id="cart__quantity">
                    {(cart?.totalItems > 99) ? '99+':(cart?.totalItems)}
                    </small>
                ) : (
                    <small id="cart__quantity">0</small>
                ) }
            </Link>
        </li>
    );
}

export default memo(NumberOfItemsInCart);
