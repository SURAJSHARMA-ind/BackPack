import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: 0,
};

export const navigateSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    setWalletNo: (state, actions) => {
      state.wallet = actions.payload;
    },
  },
});

export const { setWalletNo } = navigateSlice.actions;
export default navigateSlice.reducer;
