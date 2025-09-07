import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeTokens } from "../config/auth";
import { RootState } from "./store";

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await removeTokens();
    dispatch(logout());
  }
);

const initialState = {
  AccToken: null,
  user: {
    email: "",
    phone: "",
    name: "",
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.AccToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    setLoggedInStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.AccToken = null;
      state.user = {
        email: "",
        phone: "",
        name: "",
      };
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.AccToken = null;
      state.user = {
        email: "",
        phone: "",
        name: "",
      };
      state.isLoggedIn = false;
    });
  },
});

export const { setCredentials, logout, setLoggedInStatus } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
