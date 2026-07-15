"use client";

import axiosInstance from "@/api/baseUrl/url";
import { Doctor } from "@/typescript/doctor/doctor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endpoints from "@/api/endpoints/endpoints";
import { AxiosError } from "axios";
interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: null,
};

export const getDoctorList = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("doctor/list", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.doctorList);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctors",
    );
  }
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.doctors = payload.data;
      })
       .addCase(getDoctorList.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload ?? "Failed";
      })
  },
});
export default doctorSlice.reducer;
