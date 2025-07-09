import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import brandReducer from "./brand/brandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    brand: brandReducer,
  },
});
