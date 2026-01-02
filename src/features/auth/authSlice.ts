import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  user_type: number | null;
  user_id: string | null;
}

// Initialize from localStorage
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user_type: localStorage.getItem("user_type")
    ? Number(localStorage.getItem("user_type"))
    : null,
  user_id: localStorage.getItem("user_id") || null,
};

interface AuthPayload {
  token: string;
  user_type: number;
  user_id: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userAuthDataAdd: (state, action: PayloadAction<AuthPayload>) => {
      state.token = action.payload.token;
      state.user_type = action.payload.user_type;
      state.user_id = action.payload.user_id;
    },
  },
});

export const { userAuthDataAdd } = authSlice.actions;
export default authSlice.reducer;
