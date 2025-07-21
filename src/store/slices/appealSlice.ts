// store/slices/appealSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppealRecord } from "@/types/appeal";
import { AppealData } from "@/data/DummyData";

// Extend with optional flags
export interface AppealGridRecord extends AppealRecord {
  isNew?: boolean;
}

interface AppealState {
  records: AppealGridRecord[];
  selectedIds: string[];
}

const initialState: AppealState = {
  records: AppealData,
  selectedIds: [],
};

const appealSlice = createSlice({
  name: "appeals",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<AppealGridRecord[]>) => {
      state.records = action.payload;
    },
    addRecord: (state, action: PayloadAction<AppealGridRecord>) => {
      state.records.unshift(action.payload);
    },
    updateRecord: (state, action: PayloadAction<AppealGridRecord>) => {
      const idx = state.records.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) state.records[idx] = action.payload;
    },
    deleteRecord: (state, action: PayloadAction<number>) => {
      state.records = state.records.filter((r) => r.id !== action.payload);
    },
    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
  },
});

export const {
  setRecords,
  addRecord,
  updateRecord,
  deleteRecord,
  setSelectedIds,
} = appealSlice.actions;

export default appealSlice.reducer;
