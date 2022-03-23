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
    dereaseCart(state,action){
      let itemIndex = state.cartItems.findIndex((item)=>item.id === action.payload.id);
      if(state.cartItems[itemIndex].cartQuantity > 1){
        state.cartItems[itemIndex].cartQuantity -=1;
        toast.info("decrease product quantity!");
      }else if(state.cartItems[itemIndex].cartQuantity ===1){
        const restCartItem = state.cartItems.filter((item)=>item.id !== action.payload.id);
        state.cartItems = restCartItem;
        toast.info("Item removed from cart!");
      }
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
    },
    removeCartItem(state,action){
      const restCartItem = state.cartItems.filter((cartItems)=>cartItems.id !== action.payload.id);
      state.cartItems = restCartItem;
      toast.error("Item removed from cart!");
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
    },
    getTotals(state,action){
      let {total,quantity} = state.cartItems.reduce((cartTotal,cartItem)=>{
        const {price,cartQuantity} = cartItem;
        const itemTotal = price * cartQuantity;
        cartTotal.total += itemTotal;
        cartTotal.quantity +=cartQuantity;
        return cartTotal;
      },{total:0,quantity:0});
      total = parseFloat(total.toFixed(2));
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
    clearCart(state,action){
      state.cartItems = [];
      toast.info("All Item removed!");
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart,removeCartItem,getTotals,clearCart,dereaseCart } = cartSlice.actions

export default cartSlice.reducer