import { createAsyncThunk } from "@reduxjs/toolkit";

import { ShowSnackbar, logout, updateUser } from "../reducers/userReducer";
import toast from 'react-hot-toast';
import axios from "../../utils/axios.js";

// ------------- Login Thunk -------------
export const LoginUser = createAsyncThunk(
  "auth/signIn",
  async (formValues, { rejectWithValue, dispatch }) => {
    try {
      // API call to signIn
      const { data } = await axios.post("/auth/signIn", {
        formValues,
      });

      toast.success(data.message);

      // If user is not verified
      if (!data.user) {
        return rejectWithValue({ message: "User not verified" });
      } else {
        // Save token to local storage and update user state
        localStorage.setItem('token', `Bearer ${data.user.token}`);
        dispatch(updateUser(data.user));
      }

      return data;
    } catch (error) {
      console.error("Login error: ", error);
      // Show toast or dispatch error-related actions
      return rejectWithValue(error.response.data || { message: "Invalid Credentials" });
    }
  }
);


// ------------- Logout Thunk -------------
export const LogoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post("/auth/logout");

      // Clear local user data
      dispatch(logout());
      
      // Display success message
      toast.success(data.message || "Logged out successfully");

      // Remove token from localStorage
      localStorage.removeItem("token");

      // Redirect the user only once
      window.location.href = '/auth/signIn'; // Full page reload to login page

    } catch (error) {
      // In case of an error, still clear user state
      dispatch(logout());

      // Show error message
      toast.error(error.response?.data?.message || "Logout failed");

      return rejectWithValue(error.response?.data || error);
    }
  }
);


// ------------- Register Thunk -------------
export const RegisterUser = createAsyncThunk(
  "auth/useradd",
  async (
    { ...formValues },
    { rejectWithValue, dispatch }
  ) => {
    try {

      const { data } = await axios.post("/auth/useradd", {
        ...formValues,
      });
      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(data.message);
      return rejectWithValue(error.error);
    }
  }
);


// ------------- Forgot Password Thunk -------------
export const ForgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (
    { recaptchaRef, ...formValues },
    { rejectWithValue, dispatch, getState }
  ) => {
    // generate recaptcha token
    const recaptchaToken = await recaptchaRef.current.executeAsync();

    try {
      const { data } = await axios.post("/auth/forgot-password", {
        ...formValues,
        recaptchaToken,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Reset Password Thunk -------------
export const ResetPassword = createAsyncThunk(
  "auth/reset-password",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await axios.post("/auth/reset-password", {
        ...formValues,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Refresh Token Thunk -------------
export const RefreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      console.log("refresh-token");
      const { data } = await axios.post("/auth/refresh-token");

      // if user is not verified
      if (!data.user) {
        alert("Token expired, Logging you out...");
        dispatch(LogoutUser());
      } else {
        // update user data
        dispatch(updateUser(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);
