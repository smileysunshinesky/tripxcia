import { createSlice } from "@reduxjs/toolkit";

import {
  // AddOtpEmail,
  // ForgotPassword,
  LoginUser,
  LogoutUser,
  RefreshToken,
  RegisterUser,
  // ResetPassword,
} from "../actions/authActions";

// initial state for logged in status
const initialState = {
  isLoggedIn: false,

  isLoading: false,
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    joinsuccess(state) {
      state.isLoggedIn = true;
    },
  },
  extraReducers(builder) {
    builder
      // --------- Login Builder ---------
      .addCase(LoginUser.pending, handlePending)
      .addCase(LoginUser.fulfilled, handleLoginSuccess)
      .addCase(LoginUser.rejected, handleRejected)

      // --------- Logout Builder ---------
      .addCase(LogoutUser.pending, handlePending)
      .addCase(LogoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })

      // --------- Register Builder ---------
      .addCase(RegisterUser.pending, handlePending)
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(RegisterUser.rejected, handleRejected)
      // --------- Forgot Password Builder ---------
      // .addCase(ForgotPassword.pending, handlePending)
      // .addCase(ForgotPassword.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = false;
      // })
      // .addCase(ForgotPassword.rejected, handleRejected)

      // --------- Reset Password Builder ---------
      // .addCase(ResetPassword.pending, handlePending)
      // .addCase(ResetPassword.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = false;
      //   setTimeout(() => {
      //     window.location.href = "/";
      //   }, 1000);
      // })
      // .addCase(ResetPassword.rejected, handleRejected)

      // --------- Refresh Token Builder ---------
      .addCase(RefreshToken.pending, handlePending)
      .addCase(RefreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(RefreshToken.rejected, handleRejected);
  },
});

function handlePending(state, action) {
  state.isLoading = true;
  state.error = false;
}
function handleRejected(state, action) {
  state.isLoading = false;
  state.error = true;
}
function handleLoginSuccess(state, action) {
  // check if user is verified
  if (action.payload?.user) {
    state.isLoggedIn = true;
  } else {
    state.isLoggedIn = false;
  }
  state.isLoading = false;
  state.error = false;
}

export const { joinsuccess } = slice.actions;

export default slice.reducer;
