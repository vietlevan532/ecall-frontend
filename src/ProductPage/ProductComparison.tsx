import { useEffect, useState } from "react";
import "./ViewedProductsPage.css";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./ProductComparison.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { iProduct } from "../type";

export default function ProductComparison() {
  const [comparedProducts, setComparedProducts] = useState<iProduct[]>([]);
  const [isAddComparedProductOpen, setAddComparedProductOpen] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const [foundProducts, setFoundProducts] = useState<iProduct[]>();
  const history = useHistory();

  console.log("Compared Products", comparedProducts);
  const { url } = useRouteMatch();
  console.log("URL", url);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
    var requestOptions : RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    fetch("/api/products", requestOptions)
      .then((response) => response.json())
      .then((result) => setFoundProducts(result))
      .catch((error) => console.log(error));
  }, []);

  const handleAddComparedProductClicked = () => {
    setAddComparedProductOpen(true);
  };

  const handleComparisonAddModalClosed = () => {
    setAddComparedProductOpen(false);
  };

  const handleComparedProductRemoved = (productId: Number) => {
    const products = comparedProducts.filter(
      // eslint-disable-next-line eqeqeq
      (product) => product.id != productId
    );
    setComparedProducts(products);
  };

  const navigateToProductComparisonResultPage = () => {
    console.log('pushed data', comparedProducts);
    // eslint-disable-next-line eqeqeq
    if (comparedProducts.length == 0) {
      return;
    }
    history.push('/compare', { comparedProducts });
  }

  const handleComparedProductAdded = (addedProduct: iProduct) => {
    console.log("added product", addedProduct);
    // Find if found product list already contains this product.
    const hasExisted = comparedProducts.find(
      // eslint-disable-next-line eqeqeq
      (product) => product.id == addedProduct.id
    );
    if (hasExisted) {
      return;
    }

    setComparedProducts([...comparedProducts, addedProduct]);
  };

  return (
    <div className="product_comparison">
      {/* Heading */}
      <div className="product_comparison_heading">
        <h3>SO SÁNH SẢN PHẨM</h3>
        {/* // A "x" button here */}
        <button>x</button>
      </div>
      {/* Selected products */}
      <div className="product_comparison_content">
        <div className="product_comparison_list">
          {comparedProducts.length !== 0 &&
            comparedProducts.map((product: any) => {
              return (
                <div className="single_compared_product">
                  <p>{product.name}</p>
                  <span
                    onClick={() => handleComparedProductRemoved(product.id)}
                  >
                    x
                  </span>
                </div>
              );
            })}
          {comparedProducts.length <= 2 && (
            <div
              className="product_comparison_add"
              onClick={handleAddComparedProductClicked}
            >
              <button>+</button>
              <span>Thêm sản phẩm</span>
            </div>
          )}
        </div>

        <div className="product_comparison_operations">
          <button onClick={navigateToProductComparisonResultPage}>SO SÁNH NGAY</button>
          <button>Xóa tất cả sản phẩm</button>
        </div>
      </div>

      {/* Modal thêm sản phẩm vào danh sách so sánh */}
      <div
        className="product_comparison_add_modal"
        style={
          isAddComparedProductOpen ? { display: "block" } : { display: "none" }
        }
      >
        <div className="product_comparison_add_modal_content">
          <div
            className="product_comparison_add_modal_close"
            onClick={handleComparisonAddModalClosed}
          >
            <span>x</span>
            <span>Đóng</span>
          </div>
          <div className="product_comparison_add_modal_search">
            <FontAwesomeIcon
              icon={faSearch}
              className="product_comparison_add_modal_search_icon"
            />
            <input
              className="product_comparison_add_modal_search_input"
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
          <div className="product_comparison_add_modal_search_results">
            {foundProducts && foundProducts.length !== 0 &&
              foundProducts.map((product) => {
                return (
                  <div className="product_comparison_single_search_result">
                    <div className="product_comparison_single_search_result_container">
                      <p className="product_comparison_single_search_result_name">
                        {product.name}
                      </p>
                      <p className="product_comparison_single_search_result_price">
                        {product.price}
                        <u>đ</u>
                      </p>
                      <span
                        className="product_comparison_single_search_result_add"
                        onClick={() => handleComparedProductAdded(product)}
                      >
                        Thêm so sánh
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
