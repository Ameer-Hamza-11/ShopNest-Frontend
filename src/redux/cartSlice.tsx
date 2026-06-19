import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
    
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );
    
      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        state.cartItems.push(item);
      }
    
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
    
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.productId !== itemId
      );
    
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, clearCart, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
