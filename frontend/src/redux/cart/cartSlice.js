// // src/redux/cart/cartSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [], // each item: { productId, name, price, quantity, image }
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const newItem = action.payload;
//       const existingItem = state.cartItems.find(
//         (item) => item.productId === newItem.productId
//       );

//       if (existingItem) {
//         // Increase quantity if already in cart
//         existingItem.quantity += newItem.quantity;
//       } else {
//         // Add new item to cart
//         state.cartItems.push({ ...newItem });
//       }
//     },

//     removeFromCart: (state, action) => {
//       const productId = action.payload;
//       state.cartItems = state.cartItems.filter(
//         (item) => item.productId !== productId
//       );
//     },

//     updateQuantity: (state, action) => {
//       const { productId, quantity } = action.payload;
//       const item = state.cartItems.find((item) => item.productId === productId);
//       if (item && quantity > 0) {
//         item.quantity = quantity;
//       }
//     },

//     clearCart: (state) => {
//       state.cartItems = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// src/redux/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (e) {}
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.productId === item.productId);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
      saveCartToStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      saveCartToStorage(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.productId === productId);
      if (item) item.quantity = quantity;
      saveCartToStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage(state.cartItems);
    },
    syncCartAfterLogin: (state) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.discountPrice) {
          return {
            ...item,
            price: item.discountPrice,
          };
        }
        return item;
      });
    
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, syncCartAfterLogin } = cartSlice.actions;
export default cartSlice.reducer;

