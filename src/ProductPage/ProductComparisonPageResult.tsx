import React from "react";
import { useLocation } from "react-router";
import Top from "../Top";
import Header from "../Header";
import Footer from "../Footer";
import "./ProductComparisonPageResult.css";

export default function ProductComparisonPageResult(props: any) {
  const location = useLocation();
  const { comparedProducts: products } = location.state as any;
  const properties = Object.keys(products[0]).filter(
    (property) => property !== "id" && property !== "imageLink"
  );

  return (
    <div className=".product_comparison_page_result">
      <Top />
      <Header />
      <div className="product_comparison_result_content">
        <h2 className="product_comparison_result_content_heading">
          So sánh sản phẩm
        </h2>
        <table className="product-comparison-table">
          <tbody>
            {properties.map((property) => {
              let attribute;
              switch (property) {
                case "name":
                  attribute = "Tên sản phẩm";
                  break;
                case "price":
                  attribute = "Giá";
                  break;
                case "categoryName":
                  attribute = "Danh mục sản phẩm";
                  break;
                case "shortDes":
                  attribute = "Mô tả ngắn gọn sản phẩm";
                  break;
                case "fullDes":
                  attribute = "Mô tả chi tiết sản phẩm";
                  break;
                default:
                  console.log("Do nothing please");
              }
              return (
                <tr key={property}>
                  <td>{attribute}</td>
                  {products.map((product: any) => {
                    return <td key={product.id}>{product[property]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
