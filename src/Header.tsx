import { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setProducts } from "./features/products/productsSlice";
import NumberOfItemsInCart from "./CartPage/NumberOfItemsInCart";
import { iUser } from "./type";

function Header() {
  const [isSearchTextOpen, setIsSearchTextOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | "">("");
  const [user, setUser] = useState<iUser>();
  const dispatch = useDispatch();

  var USER: string = "ROLE_USER";

  const getUserAuthorities = () => {
    const isCustomer = localStorage.getItem('user');
    if (isCustomer) {
      const foundAuthority = JSON.parse(isCustomer);
      setUser(foundAuthority);
    }
  };

  useEffect(() => {
    getUserAuthorities();
  }, []);

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
    const newSearchText = event.target.value;
    if (newSearchText.trim().length === 0) {
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

      fetch(`/api/products`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("result: " + result);
          dispatch(setProducts(result));
        })
        .catch((error) => console.log("error", error));
    }
  };

  const handleSearchProducts = (event: any) => {
    console.log("handleSearchProducts");
    if (event.keyCode !== 13) {
      return;
    }
    

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

    fetch(`/api/products/search?searchText=${encodeURIComponent(searchText)}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result: " + result);
        dispatch(setProducts(result));
      })
      .catch((error) => console.log("error", error));

  };

  const clickSearchButton = () => {
    setIsSearchTextOpen(!isSearchTextOpen);
  };

  return (
    <div className="header">
      <div className="header__logo">
        <span className="e">E</span>
        <span className="call">call</span>
        <span className="vn">.vn</span>
      </div>
      <div className="header__right">
        <nav className="header__nav">
          <ul className="list__nav">
            <li>
              <Link to="/">TRANG CHỦ</Link>
            </li>
            <li>
              <Link to="/viewed-products">
                SẢN PHẨM ĐÃ XEM
              </Link>
            </li>
            <li>
              <Link to="/intro">GIỚI THIỆU</Link>
            </li>
            <li>
              <Link to="/products">
                <div className="header__products">
                  <span>SẢN PHẨM</span>
                  <ExpandMoreIcon className="icon__arrow" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/news">TIN TỨC</Link>
            </li>
            <li>
              <Link to="/contact">LIÊN HỆ</Link>
            </li>
            <li>
              <span>|</span>
            </li>
            
            {user?.authorities.includes(USER) ? 
              <>
                <NumberOfItemsInCart />
                <li>
                  <FontAwesomeIcon
                  icon={faSearch}
                  className="header__icon"
                  onClick={clickSearchButton}
                  />
                </li>
              </> 
              : 
              <li>
                <FontAwesomeIcon
                style={{marginLeft: '15px'}}
                icon={faSearch}
                className="header__icon"
                onClick={clickSearchButton}
                />
              </li>
            }
            
          </ul>
        </nav>
        
        
        <input
          required
          className="search__input"
          style={isSearchTextOpen ? { display: "block" } : { display: "none" }}
          placeholder="Tìm kiếm"
          value={searchText}
          onChange={(event) => handleSearchTextChange(event)}
          onKeyDown={(event) => handleSearchProducts(event)}
        />
      </div>
    </div>
  );
}

export default Header;
