

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/baseUrl/url";
import endpoints from "@/api/endpoints/endpoints";

import {
  RegisterPayload,
  RegisterResponse,
} from "@/typescript/auth/Register/Register";

import {
  LoginPayload,
  LoginResponse,
} from "@/typescript/auth/Login/auth";

import {
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/typescript/auth/Otp/auth";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

// ================= REGISTER =================

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.register, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration Failed"
    );
  }
});

// ================= LOGIN =================

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.login, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Login Failed"
    );
  }
});

// ================= OTP =================

export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>("auth/verifyOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.otp, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP Verification Failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= REGISTER =================

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Only if your register API returns user data
        if (action.payload.data) {
          state.user = action.payload.data;
        }
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration Failed";
      })

      // ================= OTP =================

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "OTP Verification Failed";
      })

      // ================= LOGIN =================

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.error = null;
        state.user = payload.data;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login Failed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

