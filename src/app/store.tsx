import {configureStore} from "@reduxjs/toolkit";
import viewedProductReducer from '../features/viewed-products/viewedProductSlice';
import productReducer from '../features/products/productsSlice';

export const store = configureStore({
    reducer: {
        viewedProducts: viewedProductReducer,
        products: productReducer,
    }
});
