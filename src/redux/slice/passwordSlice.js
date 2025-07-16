import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeData: [],
  disabledData: [],
};

const passwordSlice = createSlice({
  name: "passwords",
  initialState,
  reducers: {
    addEntry: (state, action) => {
      state.activeData.push(action.payload);
    },
    deleteEntry: (state, action) => {
      const index = state.activeData.findIndex(
        (entry) => entry.id === action.payload
      );
      if (index !== -1) {
        const [deleted] = state.activeData.splice(index, 1);
        state.disabledData.push(deleted);
      }
    },
    enableEntry: (state, action) => {
      const index = state.disabledData.findIndex(
        (entry) => entry.id === action.payload
      );
      if (index !== -1) {
        const [enabled] = state.disabledData.splice(index, 1);
        state.activeData.push(enabled);
      }
    },
    loadData: (state, action) => {
      state.activeData = action.payload.active || [];
      state.disabledData = action.payload.disabled || [];
    },
  },
});

export const { addEntry, deleteEntry, enableEntry, loadData } =
  passwordSlice.actions;
export default passwordSlice.reducer;
