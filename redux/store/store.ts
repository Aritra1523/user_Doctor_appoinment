import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/auth/authSlice";
import doctorReducer from "@/redux/slice/doctor/doctorSlice";
import slotReducer from "@/redux/slice/doctor/slotSlice";
import appoinmentsReducer from "@/redux/slice/appointmentSlice/appointmentSlice";
import historyReducer from "@/redux/slice/history/historySlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    slot: slotReducer,
    appoinment: appoinmentsReducer,
    history:historyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
