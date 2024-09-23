import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

import {
  UpdateProfile,
} from "../actions/userActions.js";

// initial state for contacts menu
const initialState = {
  isLoading: false,
  error: false,

  snackbar: {
    open: false,
    message: null,
    severity: null,
  },

  user: {
    _id: "",
    email: "",
    password: "",
    token: "",
  },
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // toggle snackbar
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state, action) {
      state.snackbar.open = false;
    },

    // update user information
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      axios.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
      // console.log("updated user: ", state.user);
    },

    // update user information
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // logout reducer | being handled from auth
    logout: (state) => {
      state.isLoading = false;
      state.error = false;
      state.user = {
        _id: "",
        email: "",
        password: "",
        token: "",
      };
    },
  },
  extraReducers(builder) {
    builder
      // --------- Profile Builder ---------
      .addCase(UpdateProfile.pending, handlePending)
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.user };
        state.isLoading = false;
        state.error = false;
      })
      .addCase(UpdateProfile.rejected, handleRejected)
  },
});

// function for pending and rejected handling
function handlePending(state, action) {
  state.isLoading = true;
  state.error = false;
}

function handleRejected(state, action) {
  state.isLoading = false;
  state.error = true;
}

// snackbar functions
export function ShowSnackbar({ message, severity }) {
  console.log(message)
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({ message, severity }));
  };
}

// snackbar functions
export function HideSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
  };
}

// set loading functions
export function SetLoading(value) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setLoading(value));
  };
}

export const {
  updateUser,
  logout,
  user,
} = slice.actions;

export default slice.reducer;
