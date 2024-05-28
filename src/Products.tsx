import './Products.css'
import ProductTrack from './ProductTrack'

function Products() {

    return (
        <div className="products">
            <ProductTrack
            title="SẢN PHẨM BÁN CHẠY"
            />
            <ProductTrack 
            title="SẢN PHẨM NỔI BẬT"
            />
            <ProductTrack 
            title="CHUÔNG GỌI PHỤC VỤ"
            />
            <ProductTrack 
            title="THẺ RUNG TỰ PHỤC VỤ" 
            />
        </div>
    )
}

export default Products
