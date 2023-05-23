import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cart: [],
    totalQuantity: 0,
    totalAmount: 0
}

const getTotalQuantity = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += item.quantity;
    });
    return total;
}
const getTotalAmount = (cart) => {
    
    let amount = 0
    cart.forEach( item => { amount += item.product.price * item.quantity;});
    return amount;
}

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemRef = state.cart.find(item => item.product.id === action.payload.id);
            itemRef
            ? itemRef.quantity += 1
            : state.cart = [...state.cart, { product: action.payload, quantity: 1 }];

            state.totalAmount = getTotalAmount(state.cart);
            state.totalQuantity = getTotalQuantity(state.cart);
        },
        removeFromCart: (state, action) => {
            const itemRef = state.cart.find(item => item.product.id === action.payload);
            itemRef.quantity <= 1
            ? state.cart = state.cart.filter(item => item.product.id !== action.payload)
            : itemRef.quantity -= 1;

            state.totalAmount = getTotalAmount(state.cart);
            state.totalQuantity = getTotalQuantity(state.cart);
        },
        deleteAllFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.product.id !== action.payload);

            state.totalAmount = getTotalAmount(state.cart);
            state.totalQuantity = getTotalQuantity(state.cart);
        },
        clearCart: (state) => {
            state.cart = [];
            state.totalAmount = getTotalAmount(state.cart);
            state.totalQuantity = getTotalQuantity(state.cart);
        },
        placeOrder: (state) => {
            const order = state.cart.map(item => {
                return { id: item.product.id, quantity: item.quantity }
                    
                })
            }
        }

})

export const { addToCart, removeFromCart, deleteAllFromCart, clearCart, placeOrder } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;