import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { productContext } from "./ProductPage/ProductPageContext";
import ImageUploader from "react-images-upload";
import { iProduct, iUser } from "./type";
import { iCategory } from "./type";
import {useDispatch} from "react-redux";
import {viewedProductAdded} from "./features/viewed-products/viewedProductSlice";

interface iParams {
  id: string;
}

var PROVIDER: string = "ROLE_PROVIDER";

function ProductDetail({setId}:any) {
  const [productId, setProductId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<iCategory>();
  const [shortDes, setShortDes] = useState<string>("");
  const [fullDes, setFullDes] = useState<string>("");
  const [categoryList, setCategoryList] = useState<iCategory[]>([]);
  const [imageLink, setImageLink] = useState<string>("");

  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isMissingField, setIsMissingField] = useState<boolean>(false);

  const [imageFile, setImageFile] = useState<any>();

  //save current user info
  const [user, setUser] = useState<iUser>();
  const [version, setVersion] = useState<string>("");

  const { id } = useParams<iParams>();
  const [product, setProduct] = useState<iProduct>();
  const history = useHistory();
  const categoryObject = useContext(productContext);
  const dispatch = useDispatch();

  const onDrop = (newImage: any) => {
    if (newImage.length > 0) {
      const selectedImage = newImage[0];
      setImageFile(selectedImage);
    } else {
      setImageFile(undefined);
    }
  };

  const handleCategoryChange = (event: { target: HTMLSelectElement }) => {
    let selectedCategoryId = event.target.value;
    categoryList.forEach((category) => {
      if (category.category_id === +selectedCategoryId) {
        setCategory(category);
      }
    });
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
    fetch(`api/cart/add/${product?.id}`, requestOptions)
      .then((response) => {
        history.push(`/products/${product?.id}`);
        alert("Thêm sản phẩm vào giỏ hàng thành công!");
        return response.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  //Fetch category list in the first render.
  useEffect(() => {
    //Scroll to the top of the page.
    window.scrollTo(0, 0);
    
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
  }, []);


  const handleUpdateProduct = () => {
    const findCategoryByCategoryName = (categoryName: string): void => {
      categoryList.forEach((category) => {
        if (category.name === categoryName) {
          setCategory(category);
        }
      });
    };

    setProductId(product?.id!);
    setName(product?.name!);
    setPrice(product?.price!);
    setImageLink(product?.imageLink ?? "");
    findCategoryByCategoryName(product?.categoryName!);
    setShortDes(product?.shortDes!);
    setFullDes(product?.fullDes!);
    setShowUpdateModal(true);
  };

  const handleDeleteProduct = () => {
    setShowDeleteModal(true);
  };


  const submitUpdateProduct = () => {
    if (
      name.trim().length === 0 ||
      price.trim().length === 0 ||
      shortDes.trim().length === 0 ||
      fullDes.trim().length === 0
    ) {
      setIsMissingField(true);  
      return;
    } else {
      setIsMissingField(false);
    }
    const formData = new FormData();
    formData.append("file", imageFile);

    var headers = new Headers();
    headers.append(
          "Authorization",
          "Bearer " + localStorage.getItem("accessToken")
    );

    var requestOptionsUploadImage: RequestInit = {
      method: "POST",
      headers: headers,
      body: formData,
      redirect: "follow",
    };
    fetch(`/api/products/upload-image/${product?.name}`, requestOptionsUploadImage)
      .then((response) => {
        return response.text();
      })
      .then((imageUpload) => {
        setImageLink(imageUpload);
        var raw = JSON.stringify({
          id: productId,
          name: name,
          price: price,
          category: category,
          shortDes: shortDes,
          fullDes: fullDes,
          imageLink: imageUpload,
        });
    
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("accessToken")
        );
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("If-Match", version);
    
        var requestOptions: RequestInit = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch("/api/provider/products", requestOptions)
          .then((response) => {
            if (response.ok) {
              alert("Cập nhật sản phẩm thành công!");
              setShowUpdateModal(false);
              return response.json();
            } else if (response.status === 412) {
              throw new Error(
                "Product has been updated! Reload to see the change..."
              );
            } else throw new Error("Cập nhật sản phẩm thất bại!");
          })
          .then((updatedProduct) => {
            setProduct(updatedProduct);
            setImageLink(imageLink);
            console.log(updatedProduct);
          })
          .catch((error) => {
            console.log("error", error);
            alert(error.message);
          });
      })
      .catch(error => {
        console.error("Error when you upload your product image", error);
        alert("Upload product image failed. Please try again!");
      });
  };

  const submitDeleteProduct = () => {
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

    console.log(product?.id);

    fetch(`/api/provider/products/${product?.id}`, requestOptions)
      .then((response) => {
        alert("Xóa sản phẩm thành công!");
        history.push("/products");
        return response.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }

    const fetchProduct = () => {
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

      fetch(`/api/products/${id}`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log('returned result', result);
          setId(id);
          setProduct(result);
          dispatch(viewedProductAdded(result));
        })
        .catch((error) => console.log("error", error));
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product__detail">
      <div className="page__location">
        <span>Trang chủ /</span>
        <span>Sản phẩm </span>
        {categoryObject.category ? (
          <span>
            /{" "}
            {categoryObject.category.name.charAt(0).toLocaleUpperCase() +
              categoryObject.category.name.slice(1).toLocaleLowerCase()}
          </span>
        ) : null}
        {product ? <span> / {product.name} </span> : null}
      </div>
      {user?.authorities.includes(PROVIDER) ? (
        <div className="provider__buttonGroup">
          <button
            type="button"
            className="provider__button"
            onClick={handleUpdateProduct}
          >
            Cập nhật sản phẩm
          </button>
          <button
            type="button"
            className="provider__button"
            id="deleteProductButton"
            onClick={handleDeleteProduct}
          >
            Xóa sản phẩm
          </button>
        </div>
      ) : null}
      <div
        className="addProductModal"
        style={showUpdateModal ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={() => setShowUpdateModal(false)}>
            &times;
          </span>
          <form className="form__addProduct">
            <div className="form__addProductTitle">
              <h4>CẬP NHẬT THÔNG TIN SẢN PHẨM</h4>
              <p>Hãy nhập đầy đủ thông tin sản phẩm</p>
            </div>
            <div className="form__addProductInputs">
              <div className="form__addProductInput">
                <p>Tên sản phẩm: </p>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="form__addProductInput">
                <p>Giá: </p>
                <input
                  type="text"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div className="form__addProductInput">
                <p>Thuộc danh mục: </p>
                <select
                  name="category"
                  value={category?.category_id}
                  onChange={(event) => handleCategoryChange(event)}
                >
                  {categoryList.map((category) => {
                    return (
                      <option key={category.category_id} value={category.category_id}>
                        {category.category_id}. {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form__addProductInput">
                <p>Miêu tả ngắn gọn: </p>
                <input
                  type="text"
                  value={shortDes}
                  onChange={(event) => setShortDes(event.target.value)}
                />
              </div>
              <div className="form__addProductInput">
                <p>Miêu tả đầy đủ: </p>
                <textarea
                  name="fullDes"
                  rows={15}
                  cols={50}
                  value={fullDes}
                  placeholder="Miêu tả đầy đủ thông tin sản phẩm"
                  onChange={(event) => setFullDes(event.target.value)}
                />
              </div>
              <div className="form__addProductInput">
                <p>Ảnh sản phẩm: </p>
                <img src={product?.imageLink} alt="" />
              </div>
              <div className="form__addProductInput">
                <p>Ảnh sản phẩm: </p>
                <ImageUploader
                  withIcon={false}
                  buttonText="Chọn ảnh"
                  singleImage
                  withPreview
                  onChange={onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </div>
              {isMissingField ? (
                <p className="addProduct__errorLog" style={{ color: "red" }}>
                  Cần điền đầy đủ vào các trường thông tin còn thiếu
                </p>
              ) : null}
              <button
                type="button"
                className="submitNewProduct__button"
                onClick={submitUpdateProduct}
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="deleteProduct__Modal"
        style={showDeleteModal ? { display: "block" } : { display: "none" }}
      >
        <div className="deleteProduct_modalContent">
          <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
          <div>
            <button
              id="cancelDelete__button"
              type="button"
              className="provider__button"
              onClick={() => setShowDeleteModal(false)}
            >
              Hủy
            </button>
            <button
              type="button"
              className="provider__button"
              onClick={submitDeleteProduct}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="product__detailMain">
        <header>
          <img
            src={product?.imageLink}
            style={{ width: "230px", height:'auto', border: '1px solid gray'}}
            alt=""
          />
          <div className="product__detailIntro">
            <h3>{product?.name}</h3>
            <p>
              Giá: <span> 
                      {product?.price ? Number(product.price).toLocaleString('vi-VN', {
                        style: 'decimal',
                      }) : 'N/A'} 
                    </span> đồng
            </p>
            <p className="product__detailShortDes">{product?.shortDes}</p>
            <button className="add__cart__btn" onClick={handleAddCartClick}>Thêm vào giỏ hàng</button>
          </div>
          
        </header>
        <main className="product__detailFullDes">
          <p style={{marginBottom: '0', padding: '5px'}}>Chi tiết sản phẩm</p>
          <div className="fullDes__content">{product?.fullDes}</div>
        </main>
      </div>
    </div>
  );
}

export default ProductDetail;
