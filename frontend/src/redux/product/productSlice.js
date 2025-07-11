import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// GET all products
export const getProducts = createAsyncThunk('product/getProducts', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/products');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching products');
  }
});

export const getProductsByBrand = createAsyncThunk(
  'product/getProductsByBrand',
  async (brandName, thunkAPI) => {
    try {
      const res = await axios.get(`/brand/${brandName}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error fetching brand products'
      );
    }
  }
);

// CREATE product
export const createProduct = createAsyncThunk('product/createProduct', async (formData, thunkAPI) => {
  try {
    const res = await axios.post('/create-product', formData, {
      headers: { 'Content-Type' : 'multipart/form-data' },
    });
    return res.data.product;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error creating product');
  }
});

// UPDATE product
export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, formData }, thunkAPI) => {
  try {
    const res = await axios.put(`/product/${id}`, formData, {
      headers: { 'Content-Type' : 'multipart/from-data' }
    });
    return res.data.product;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error updating product');
  }
});

// DELETE product
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, thunkAPI) => {
  try {
    await axios.delete(`/product/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error deleting product');
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    brandProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getProducts.pending, (state) => {
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
       // GET BRAND PRODUCTS
       .addCase(getProductsByBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brandProducts = action.payload;
      })
      .addCase(getProductsByBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
