import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

const getCart = JSON.parse(localStorage.getItem('cartItems'));

const initialState = {
  cartItems: getCart ? getCart : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity");
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem(state,action){
      const restCartItem = state.cartItems.filter((cartItems)=>cartItems.id !== action.payload.id);
      state.cartItems = restCartItem;
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart,removeCartItem } = cartSlice.actions

export default cartSlice.reducer