import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
