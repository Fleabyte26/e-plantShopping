import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
    reducer: {
        // 'cart' is the slice of state managed by cartReducer
        cart: cartReducer,
    },
});

export default store; // Export the store for use in <Provider>