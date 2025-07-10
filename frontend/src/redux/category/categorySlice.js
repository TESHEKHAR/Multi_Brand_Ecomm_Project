import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// Get all categories
export const getCategories = createAsyncThunk('category/getCategories', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/get-category');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching categories');
  }
});

// Create a new category
export const createCategory = createAsyncThunk('category/createCategory', async (formData, thunkAPI) => {
  try {
    const res = await axios.post('/create-category', formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data.category;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error creating category');
  }
});

// Delete a category
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
  try {
    await axios.delete(`/categories/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error deleting category');
  }
});

// Update a category
export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, formData }, thunkAPI) => {
  try {
    const res = await axios.put(`/categories/${id}`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data.category;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error updating category');
  }
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.unshift(action.payload);
      })

      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
      })

      // Update
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  },
});

export default categorySlice.reducer;
