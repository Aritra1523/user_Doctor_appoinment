import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/baseUrl/url";
import endpoints from "@/api/endpoints/endpoints";
import { AxiosError } from "axios";

interface DashboardState {
  loading: boolean;
  error: string | null;
  data: any | null;
}

const initialState: DashboardState = {
  loading: false,
  error: null,
  data: null,
};

// Calls GET /user/dashboard (endpoints.dasbord)
export const getDashboard = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("dashboard/getDashboard", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(endpoints.dasbord);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.data = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;
        // unwrap { data: {...} } or raw object, same defensive pattern used elsewhere in the app
        state.data = action.payload?.data ?? action.payload;
      })

      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;