import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// State type
export interface AuthState {
  token: string | null;
  user_type: number | null;
  user_id: string | null;
}

// Initial state
const initialState: AuthState = {
  token: null,
  user_type: null,
  user_id: null,
};

// Payload type for action
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
      console.log("Redux state updated:", state);
    },
  },
});

export const { userAuthDataAdd } = authSlice.actions;
export default authSlice.reducer;
