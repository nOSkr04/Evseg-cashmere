import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../interface/auth";
import { IUser } from "../interface/user";

const initialState: IAuth = {
  user : null,
  token: null,
};

const authSlice = createSlice({
  name    : "auth",
  initialState,
  reducers: {
    authLogin: (state, { payload }: { payload: IAuth }) => {
      state.token = payload.token;
      return state;
    },
    authLogout: (state) => {
      state.user = null;
      state.token = null;
      return state;
      
    },
    authMe: (state, { payload }: { payload: IUser}) => {
      state.user = payload;
      return state;
    }
  },
});

export const authReducer = authSlice.reducer;

export const { authLogin, authMe, authLogout } = authSlice.actions;