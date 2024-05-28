import {createSlice} from "@reduxjs/toolkit";

export const viewedProductSlice = createSlice({
    name: 'viewedProducts',
    initialState: [],
    reducers: {
        viewedProductAdded: (state: any, action) => {
            console.log('viewed product', action.payload);
            const {id} = action.payload;

            if (state.length == 0) {
                state.push(action.payload);
                return;
            }

            const viewedProduct = state.find((product: any) => product.id === id);

            if (!viewedProduct) {
                state.push(action.payload);
            }
        }
    }
});

export const {viewedProductAdded} = viewedProductSlice.actions;

export const selectViewedProducts = (state: any) => state.viewedProducts;

export default viewedProductSlice.reducer;