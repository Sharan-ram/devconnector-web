import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  type: "",
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    showSnackbar(state, action) {
      const { message, type } = action.payload;
      state.open = true;
      state.message = message;
      state.type = type;
    },
    clearState() {
      return initialState;
    },
  },
});

export const { showSnackbar, clearState } = uiSlice.actions;

export default uiSlice.reducer;
