"use client";

import axiosInstance from "@/api/baseUrl/url";
import { Doctor } from "@/typescript/doctor/doctor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoints from "@/api/endpoints/endpoints";
import { AxiosError } from "axios";

interface DoctorListArgs {
  page?: number;
  limit?: number;
}

// Define the expected response structure from the API
interface DoctorListResponse {
  data: Doctor[];
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}

interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  totalItems: 0,
  totalPages: 1,
};

export const getDoctorList = createAsyncThunk<
  DoctorListResponse,      // Return type on success
  DoctorListArgs,          // Argument type
  { rejectValue: string }  // Reject value type
>("doctor/list", async ({ page = 1, limit = 5 }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      `${endpoints.doctorList}?page=${page}&limit=${limit}`
    );
    
   
    return {
      data: response.data.data || response.data.doctors || [],
      totalItems: response.data.totalItems || response.data.total || 0,
      totalPages: response.data.totalPages || response.data.pages || 1,
      page: page,
      limit: limit,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctors"
    );
  }
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    // Optional: Add a reset action
    resetDoctorState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.doctors = payload.data;
        state.page = payload.page;
        state.limit = payload.limit;
        state.totalItems = payload.totalItems;
        state.totalPages = payload.totalPages;
      })
      .addCase(getDoctorList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Failed to fetch doctors";
      });
  },
});

// Export the reset action if you added it
export const { resetDoctorState } = doctorSlice.actions;

export default doctorSlice.reducer;