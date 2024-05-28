import { createRef, useContext, useEffect, useRef, useState } from "react";
import "./SideBar.css";
import { productContext } from "./ProductPage/ProductPageContext";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { iUser } from "./type";

interface Category {
  category_id: number;
  name: string;
}

const PROVIDER = "ROLE_PROVIDER";

function SideBar() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  //Add category stuff
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string | "">("");
  const [reloadCategoryList, setReloadCategoryList] = useState<boolean>(false);
  const addCategoryButton = createRef();
  //Delete category stuff

  const [user, setUser] = useState<iUser>();
  const [isProvider, setIsProvider] = useState<boolean>(false);

  const categoryObject = useContext(productContext);
  const history = useHistory();

  const clickAddCategoryButton = () => {
    setIsAddCategoryOpen(!isAddCategoryOpen);
  };

  const handleCategoryClick = (category: Category) => {
    categoryObject.setCategory(category);
    history.push("/products");
    console.log(category);
  };

  const handleAddCategory = (event: any) => {
    console.log(event.keyCode);
    console.log(newCategoryName);
    if (event.keyCode !== 13 || newCategoryName.trim().length === 0) {
      return;
    }

    console.log("been here");

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ name: newCategoryName });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/provider/categories", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setReloadCategoryList(true);
        clickAddCategoryButton();
        //addCategoryButton.current.click();
      })
      .catch((error) => console.log("error", error));
  };

  const handleDeleteCategory = (categoryId: number) => {
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

    fetch(`/api/provider/categories/${categoryId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setReloadCategoryList(true);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const fetchCategoryList = () => {
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

      fetch("/api/categories", requestOptions)
        .then((response) => response.json())
        .then((categoryList) => {
          setCategoryList(categoryList);
        })
        .catch((error) => console.log("error", error));
    };

    fetchCategoryList();

    return () => {
      setReloadCategoryList(false);
    };
  }, [reloadCategoryList]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      if (foundUser?.authorities.includes(PROVIDER)) setIsProvider(true);
    }
  }, []);

  return (
    <div className="side__bar">
      <div className="product__list">
        <div className="list__title">
          <span>DANH MỤC SẢN PHẨM</span>
        </div>
        <ul className="list__items">
          {categoryList.length !== 0
            ? categoryList.map((category) => {
                return (
                  <li
                    key={category.category_id}
                    onClick={() => handleCategoryClick(category)}
                    className="category__item"
                  >
                    <span>{category.name}</span>
                    <Button
                      onClick={() => handleDeleteCategory(category.category_id)}
                      className="deleteCategory__button"
                      style={isProvider? { display: "block" } : { display: "none" }}
                    >
                      Xóa
                    </Button>
                  </li>
                );
              })
            : null}
        </ul>
        <input
          required
          className="addCategory__input"
          style={isProvider && isAddCategoryOpen ? { display: "block" } : { display: "none" }}
          placeholder="Nhập tên danh mục sản phẩm mới"
          value={newCategoryName}
          onChange={(event) => setNewCategoryName(event.target.value)}
          onKeyDown={(event) => handleAddCategory(event)}
        />
        <Button
          className="addCategory__button"
          onClick={clickAddCategoryButton}
          style={isProvider? { display: "block" } : { display: "none" }}
        >
          {isAddCategoryOpen ? String.fromCharCode(215) : "+"}
        </Button>
      </div>
      <div className="hot__products">
        <div className="hot__productsTitle">
          <span>SẢN PHẨM NỔI BẬT</span>
        </div>
        <div className="hot__product">
          <div className="image__container">
            <img src="./ProductPhotos/product6.jpg" alt="" />
          </div>
          <span>Nút chuông gọi y tá</span>
        </div>
        <div className="hot__product">
          <div className="image__container">
            <img src="./ProductPhotos/product1.jpg" alt="" />
          </div>
          <span>Nút chuông gọi y tá</span>
        </div>
        <div className="hot__product">
          <div className="image__container">
            <img src="./ProductPhotos/product2.jpg" alt="" />
          </div>
          <span>Nút chuông gọi y tá</span>
        </div>
        <div className="hot__product">
          <div className="image__container">
            <img src="./ProductPhotos/product3.jpg" alt="" />
          </div>
          <span>Nút chuông gọi y tá</span>
        </div>
        <div className="hot__product">
          <div className="image__container">
            <img src="./ProductPhotos/product4.jpg" alt="" />
          </div>
          <span>Nút chuông gọi y tá</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
