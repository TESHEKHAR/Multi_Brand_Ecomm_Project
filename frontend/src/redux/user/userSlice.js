import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/user');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
  }
});

export const approveUser = createAsyncThunk('user/approveUser', async(userId, thunkAPI) => {
  try {
    const res = await axios.put(`/admin/approve/${userId}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Approval failed');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) state.users[index] = updatedUser;  
      });
  },
});

export default userSlice.reducer;
