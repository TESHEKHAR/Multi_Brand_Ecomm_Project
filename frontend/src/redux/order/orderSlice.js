import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// 👉 Place Order
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post('/place-order', orderData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to place order'
      );
    }
  }
);

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  const res = await axios.get("/orders");
  return res.data;
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.success = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
