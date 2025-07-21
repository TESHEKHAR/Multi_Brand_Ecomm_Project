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

export const setPassword = createAsyncThunk(
  'user/setPassword',
  async ({ userId, token, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/user/set-password', {
        userId,
        token,
        newPassword,
        confirmPassword,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Password reset failed');
    }
  }
);
export const getSingleApprovedUser = createAsyncThunk(
  'user/getSingleApprovedUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to get approved user');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    singleUser: null,
    singleUserLoading: false,
    singleUserError: null,
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
      })
      .addCase(setPassword.pending, (state) => {
        state.setPasswordLoading = true;
        state.setPasswordSuccess = false;
        state.error = null;
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.setPasswordLoading = false;
        state.setPasswordSuccess = true;
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.setPasswordLoading = false;
        state.setPasswordSuccess = false;
        state.error = action.payload;
      })
      .addCase(getSingleApprovedUser.pending, (state) => {
        state.singleUserLoading = true;
        state.singleUserError = null;
      })
      .addCase(getSingleApprovedUser.fulfilled, (state, action) => {
        state.singleUserLoading = false; 
        state.singleUser = action.payload;
      })
      .addCase(getSingleApprovedUser.rejected, (state, action) => {
        state.singleUserLoading = false;
        state.singleUserError = action.payload;
      });            
  },
});

export default userSlice.reducer;
