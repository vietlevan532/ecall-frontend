import { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { productContext } from "./ProductPage/ProductPageContext";
import "./ProductPageContent.css";
import ImageUploader from "react-images-upload";
import { iUser } from "./type";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./features/products/productsSlice";

interface Category {  
  category_id: number;
  name: string;
}

const PROVIDER = "ROLE_PROVIDER";

function ProductPageContent() {

  const productList = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  const [isSearchTextOpen, setIsSearchTextOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | "">("");

  const handleSearchProducts = (event: any) => {
    console.log(event.keyCode);
    if (event.keyCode !== 13 || searchText.trim().length === 0) {
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
        // setProductList(result);
        dispatch(setProducts(result));
      })
      .catch((error) => console.log("error", error));

  };

  const clickSearchButton = () => {
    setIsSearchTextOpen(!isSearchTextOpen);
  };

  // const [productList, setProductList] = useState<iProduct[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageNumberList, setPageNumberList] = useState<number[]>([]);

  //State to save product
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<Category>();
  const [shortDes, setShortDes] = useState<string>("");
  const [fullDes, setFullDes] = useState<string>("");
  const [imageLink, setImageLink] = useState<string>("");
  //Image things
  const [imageFile, setImageFile] = useState<any>();

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [isMissingField, setIsMissingField] = useState<boolean>(false);
  //save current user info
  const [user, setUser] = useState<iUser>();

  const categoryObject = useContext(productContext);

  const onDrop = (newImage: any) => {
    if (newImage.length > 0) {
      const selectedImage = newImage[0];
      setImageFile(selectedImage);
    } else {
      setImageFile(undefined);
    }
  };
  
  const handleAddProduct = () => {
    setShowAddModal(true);
  };
  
  useEffect(() => {
    if (showAddModal) {
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
    }
  }, [showAddModal]);

  useEffect(() => {
    setCategory(categoryList[0]);
  }, [categoryList]);

  const handleCategoryChange = (event: { target: HTMLSelectElement }) => {
    let selectedCategoryId = event.target.value;
    categoryList.forEach((category) => {
      if (category.category_id === +selectedCategoryId) {
        setCategory(category);
      }
    });
  };

  const submitAddNewProduct = () => {
    if (
      name.trim().length === 0 ||
      price.trim().length === 0 ||
      shortDes.trim().length === 0 ||
      fullDes.trim().length === 0 
      //imageLink.trim().length === 0
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
    fetch(`/api/products/upload-image/${name}`, requestOptionsUploadImage)
      .then((response) => {
        return response.text();
      })
      .then((imageUpload) => {
        setImageLink(imageUpload);
        var raw = JSON.stringify({
          name: name,
          price: price,
          category: category,
          shortDes: shortDes,
          fullDes: fullDes,
          imageLink: imageUpload,
        });
        console.log("Product: ",raw);
  
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("accessToken")
        );
        myHeaders.append("Content-Type", "application/json");
  
        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch("/api/provider/products", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          alert("Thêm sản phẩm thành công!");
          setShowAddModal(false);
          setName('');
          setPrice('');
          setShortDes('');
          setFullDes('');
          setImageLink('');
        })
        .catch((error) => {
          console.log("error", error);
          alert("Error happened! Try again!");
        });
      })
      .catch(error => {
        console.error("Error when you upload your product image", error);
        alert("Upload product image failed. Please try again!");
      });
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }

    const getTotalPages = () => {
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
  
      fetch("/api/products/totalPages?size=12", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setTotalPages(result);
        })
        .catch((error) => console.log("error", error));
    };
  
    const getTotalPagesByCategory = (): void => {
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
  
      fetch(
        `/api/products/category/totalPages/${categoryObject.category?.category_id}?size=12`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setTotalPages(result);
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    };

    const getAllProduct = (): void => {
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
  
      fetch(`/api/products?size=12&page=${currentPage - 1}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // setProductList(result);
          dispatch(setProducts(result));
        })
        .catch((error) => console.log("error", error));
    };
  
    const getAllProductByCategory = (): void => {
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
  
      fetch(
        `/api/products/category/${
          categoryObject.category?.category_id
        }?size=12&page=${currentPage - 1}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // setProductList(result);
          dispatch(setProducts(result));
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    };

    if (categoryObject.category === undefined) {
      //Get all the product
      getAllProduct();
      getTotalPages();
    } else {
      //Get all product by category
      getAllProductByCategory();
      getTotalPagesByCategory();
    }
    let temPageList: number[] = [];
    if (totalPages !== 0) {
      for (var i = 1; i <= totalPages; i++) {
        temPageList.push(i);
      }
    }
    setPageNumberList(temPageList);
  }, [categoryObject, totalPages, currentPage, showAddModal]);

  return (
    <div className="product__pageContent">
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
      </div>
      {user?.authorities.includes(PROVIDER) ? (
        <div className="addModal__buttonWrapper">
          <button
            type="button"
            onClick={handleAddProduct}
            className="addModal__button"
          >
            Thêm sản phẩm
          </button>
        </div>
      ) : null}
      <div
        id="addProductModal"
        className="addProductModal"
        style={showAddModal ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={() => setShowAddModal(false)}>
            &times;
          </span>
          <form className="form__addProduct">
            <div className="form__addProductTitle">
              <h4>THÊM SẢN PHẨM MỚI</h4>
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
                <p>Ảnh sản phẩm </p>
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
                onClick={submitAddNewProduct}
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="product__pageContent">
        <div className="row">
          {productList.length !== 0
            ? productList.map((product: any) => {
                return (
                  <div className="col-md-4">
                    <div className="product__container">
                      <Product
                        id={product.id}
                        name={product.name}
                        image={product.imageLink}
                        shortDes={product.shortDes}
                      />
                    </div>
                  </div>
                  
                );
              })
            : null}
        </div>
        <div className="product__pageNumbers">
          {totalPages !== 0
            ? pageNumberList.map((number) => {
                return (
                  <button
                    key={number}
                    value={number}
                    onClick={() => setCurrentPage(number)}
                    className={
                      currentPage === number
                        ? "color__currentPage"
                        : "normal__currentPage"
                    }
                  >
                    {number}
                  </button>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default ProductPageContent;
