import { configureStore } from '@reduxjs/toolkit'
import productListSlice from './features/products/productListSlice'
import orderSlice  from './features/orders/orderSlice'
import authSlice from './features/auth/authSlice'

export const store = configureStore({
    reducer: {
        productList: productListSlice,
        orders: orderSlice,
        auth: authSlice,
    }
})

