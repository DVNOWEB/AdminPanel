import { configureStore } from '@reduxjs/toolkit'
import productListSlice from './features/products/productListSlice'
import shoppingCartSlice  from './features/shoppingCart/shoppingCartSlice'
import authSlice from './features/auth/authSlice'

export const store = configureStore({
    reducer: {
        productList: productListSlice,
        shoppingCart: shoppingCartSlice,
        auth: authSlice,
    }
})

