import { configureStore } from "@reduxjs/toolkit";
import appealReducer from "./slices/appealSlice";

export const store = configureStore({
  reducer: {
    appeals: appealReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
