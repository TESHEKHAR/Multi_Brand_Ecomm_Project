import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// ✅ GET all products (Sandia Products)
export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/get-sandia-products');
      return res.data.products; // Assuming response structure { products: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error fetching products'
      );
    }
  }
);

// ✅ CREATE a new product
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post('/create-sandia-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.product; // Assuming response structure { product: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error creating product'
      );
    }
  }
);
const sandiaproductSlice = createSlice({
    name: 'sandiaProduct',
    initialState: {
      products: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: builder => {
      builder
        // GET PRODUCTS
        .addCase(getProducts.pending, state => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // CREATE PRODUCT
        .addCase(createProduct.pending, state => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products.push(action.payload);
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default sandiaproductSlice.reducer;
  