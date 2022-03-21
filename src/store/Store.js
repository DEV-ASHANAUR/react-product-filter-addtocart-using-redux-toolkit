import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './Feature/Cart/CartSlice';

export const store = configureStore({
  reducer: {cart:cartReducer},
})