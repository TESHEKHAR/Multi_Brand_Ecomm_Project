// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../api/axiosInstance';

// // Async Thunks
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/login', credentials);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data.message);
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/register', userData);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data.message);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logoutUser',
//   async(_, { getState, rejectWithValue }) => {
//     try {
//       const { accessToken } = getState().auth;
//       const res = await axios.post('/logout', {}, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         }
//       });
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Logout failed");
//     }
//   }
// );

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//     accessToken: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("user");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.accessToken = action.payload.accessToken;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       //logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.accessToken = null;
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("user");
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// Async Thunks (remain the same)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/register', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async(_, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth;
      const res = await axios.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// Get initial state from localStorage if available
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  accessToken: localStorage.getItem("accessToken") || null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState, // Use the new initialState
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        // Save to localStorage on successful login
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Clear tokens on failed login attempt if they were somehow present
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })

      // Register (no change needed as user won't be logged in directly via register)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        // You might want to automatically log in the user after registration here
        // If so, set accessToken and user in state and localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout (remain the same)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Even if logout fails on server, clear local state to prevent broken UI
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        state.error = action.payload; // Optional: display logout error
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
