import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    reset(state) {
      state.username = "";
      state.password = "";
    },
  },
});

export default loginSlice.reducer;
export const loginActions = loginSlice.actions;
