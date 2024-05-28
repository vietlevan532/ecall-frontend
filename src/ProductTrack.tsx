import { useEffect, useState } from "react";
import Product from "./Product";
import './ProductTrack.css'
import { iProduct } from "./type";

interface iProductTrack {
  title: string,
}

function ProductTrack({ title }: iProductTrack) {

  const [products, setProducts] = useState<iProduct[]>();

  console.log('4 products: ' ,products)

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch("/api/products/random4Product", requestOptions)
      .then(response => response.json())
      .then(result => setProducts(result))
      .catch(err => console.error("Error get 4 Products",err));
  }, []);

  return (
    <div className="product__track">
      <header>
        <div className="track__title">
            <span>{title}</span>
        </div>
      </header>
      <div className="track">
        <div className="row" style={{marginBottom:'1rem'}}>
          {products?.map((product) =>
            <div className="col-md-3">
            <Product 
              id={product.id}
              name={product.name}
              image={product.imageLink}
              shortDes={product.shortDes}
            />
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductTrack;
