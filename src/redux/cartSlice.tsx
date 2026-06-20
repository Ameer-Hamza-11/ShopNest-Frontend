import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 1. Define the exact structure of a Cart Item
export interface CartItem {
  productId: string;
  price: number;
  quantity: number;
  name?: string;
  imageUrl?: string;
}

// 2. Define the structure of your Cart state
interface CartState {
  cartItems: CartItem[];
}

// 3. Safely grab initial state from localStorage without passing null to JSON.parse
const storedCart = localStorage.getItem("cartItems");
const initialState: CartState = {
  cartItems: storedCart ? JSON.parse(storedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 4. Type the actions using PayloadAction
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
    
      const existingItem = state.cartItems.find(
        (cartItem: CartItem) => cartItem.productId === item.productId
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
    removeCartItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
    
      state.cartItems = state.cartItems.filter(
        (cartItem: CartItem) => cartItem.productId !== itemId
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
