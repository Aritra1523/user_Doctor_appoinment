"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/baseUrl/url";
import endpoints from "@/api/endpoints/endpoints";
import { AxiosError } from "axios";

export interface SlotPayload {
  doctorId: string;
  date: string;
}

interface SlotState {
  slots: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SlotState = {
  slots: [],
  loading: false,
  error: null,
};

export const getSlotList = createAsyncThunk<
  any,
  SlotPayload,
  { rejectValue: string }
>(
  "slot/list",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endpoints.userSlotList,
        payload
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch slots"
      );
    }
  }
);

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    clearSlots: (state) => {
      state.slots = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getSlotList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSlotList.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload.data ?? [];
      })

      .addCase(getSlotList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      });
  },
});

export const { clearSlots } = slotSlice.actions;

export default slotSlice.reducer;