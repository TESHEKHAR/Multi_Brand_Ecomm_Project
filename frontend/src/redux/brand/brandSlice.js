import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// Get all brands
export const getBrands = createAsyncThunk('brand/getBrands', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/brands');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching brands');
  }
});

// Create a new brand
export const createBrand = createAsyncThunk('brand/createBrand', async (formData, thunkAPI) => {
  try {
    const res = await axios.post('/brands', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.brand;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error creating brand');
  }
});

// Delete a brand
export const deleteBrand = createAsyncThunk('brand/deleteBrand', async (id, thunkAPI) => {
  try {
    await axios.delete(`/brands/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error deleting brand');
  }
});

// Update a brand
export const updateBrand = createAsyncThunk('brand/updateBrand', async ({ id, formData }, thunkAPI) => {
  try {
    const res = await axios.put(`/brands/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.brand;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error updating brand');
  }
});

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brands.unshift(action.payload);
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter((b) => b._id !== action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      });
  },
});

export default brandSlice.reducer;
