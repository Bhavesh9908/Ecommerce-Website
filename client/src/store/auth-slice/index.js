import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token : null,
};

// Register
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`, // ✅ Fixed
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Login
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`, // ✅ Fixed
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`, // ✅ Fixed
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Check Authentication
// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",
//   async () => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/auth/check-auth`, // ✅ Fixed
//       {
//         withCredentials: true,
//         headers: {
//           "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//         },
//       }
//     );
//     return response.data;
//   }
// );

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async ( token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/check-auth`, // ✅ Fixed
      {
        headers: {
          Authorization : 'Bearer ${token}',
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    return response.data;
  }
);



// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      resetTokenAndCredential : (state)=>{
        state.isAuthenticated = false ;
        state.user = null 
        state.token = null
      }

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token ;
        sessionStorage.setItem('token', JSON.stringify(action.payload.token))
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser , resetTokenAndCredential } = authSlice.actions;
export default authSlice.reducer;
