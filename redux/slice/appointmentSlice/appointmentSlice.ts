import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import axiosInstance from "@/api/baseUrl/url";
import endpoints from "@/api/endpoints/endpoints";

export interface BookAppointmentPayload {
  doctorId: string;
  userId: string;
  name: string;
  date: string;
  time: string;
}

interface AppointmentState {
  loading: boolean;
  error: string | null;
  appointment: any | null;
}

const initialState: AppointmentState = {
  loading: false,
  error: null,
  appointment: null,
};

export const bookAppointment = createAsyncThunk<
  any,
  BookAppointmentPayload,
  { rejectValue: string }
>(
  "appointment/bookAppointment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endpoints.bookAppointment,
        data
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "Appointment Booking Failed"
      );
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },

    clearAppointment: (state) => {
      state.appointment = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // BOOK APPOINTMENT

      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload.data;
      })

      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Appointment Booking Failed";
      });
  },
});

export const {
  clearAppointment,
  clearAppointmentError,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;