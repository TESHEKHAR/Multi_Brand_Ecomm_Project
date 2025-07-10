import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import brandReducer from "./brand/brandSlice";
import productReducer from "./product/productSlice";
import categoryReducer from "./category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    brand: brandReducer,
    product: productReducer,
    category: categoryReducer,
  },
});
