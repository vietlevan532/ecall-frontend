import Top from "../Top";
import Header from "../Header";
import './ViewedProductsPage.css';
import Footer from "../Footer";
import {useSelector} from "react-redux";
import {selectViewedProducts} from "../features/viewed-products/viewedProductSlice";
import Product from "../Product";

export default function () {
    const viewedProducts = useSelector(selectViewedProducts);
    return (
        <div className="viewed_products_page">
            <Top />
            <Header />
            <div className="viewed_products_page_main">
                <h1 style={{textAlign: 'center', width:'100%', padding: '5px 0', margin:'30px 5px', backgroundColor: '#F56526', color:'whitesmoke'}}><b>SẢN PHẨM ĐÃ XEM</b></h1>
                <div className="row">
                    {viewedProducts.length > 0 && viewedProducts.map((product: any) => {
                        return (
                            <div className="col-md-3 mb-4">
                                <Product
                                    id={product.id}
                                    image={product.imageLink}
                                    name={product.name}
                                    shortDes={product.shortDes}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}