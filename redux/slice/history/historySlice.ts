import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/baseUrl/url";
import endpoints from "@/api/endpoints/endpoints";
import { AxiosError } from "axios";

interface HistoryState {
  loading: boolean;
  error: string | null;
  history: any[];
}

const initialState: HistoryState = {
  loading: false,
  error: null,
  history: [],
};

export const getHistory = createAsyncThunk<
  any,
  { userId: string; doctorId?: string },
  { rejectValue: string }
>(
  "history/getHistory",
  async ({ userId, doctorId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(endpoints.history, {
        params: {
          userId,
          doctorId: doctorId ?? "",
        },
      });

      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch history"
      );
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.data;
      })

      .addCase(getHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default historySlice.reducer;