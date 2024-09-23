import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

import {
  GetFriends,
  GetOnlineFriends,
  SearchFriends,
  UpdateProfile,
  getAllusers
} from "../actions/userActions.js";

// initial state for contacts menu
const initialState = {
  users: [],
  isLoading: false,
  error: false,

  snackbar: {
    open: false,
    message: null,
    severity: null,
  },

  showFriendsMenu: false,

  user: {
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    avatar: "",
    activityStatus: "",
    token: "",
  },

  friends: [],
  onlineFriends: [],

  searchResults: [],
  searchCount: null,
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

    setShowFriendsMenu(state, action) {
      state.showFriendsMenu = !state.showFriendsMenu;
    },

    // update user information
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      axios.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
      // console.log("updated user: ", state.user);
    },
    userStatusUpdate: (state, action) => {
      // console.log(action.payload);
      const userId = action.payload.userid;
      const userStatus = action.payload.status;
      if(state.user._id === userId) {
        state.user.onlineStatus = userStatus;
      }
      const updateduser = state.users.users?.find(user => user._id === userId);
      if (updateduser) {
        updateduser.onlineStatus = userStatus;
      }
    },
    updateUsersList: (state, action) => {
      const newUser = action.payload; // Assuming action.payload is a new user object

      // Check if state.users.users is an array
      if (Array.isArray(state.users.users)) {
        // Push the new user into the nested array
        state.users.users.push(newUser);
        state.users.usersFound += 1; 
      } else {
        // Fallback in case state.users.users was somehow set to a non-array value
        state.users.users = [newUser];
      }
    },

    // update online users
    updateOnlineUsers: (state, action) => {
      const { _id, firstName, lastName, username, avatar, onlineStatus } = action.payload;
      const index = state.onlineFriends.findIndex(
        (friend) => friend._id === _id
      );

      if (index !== -1) {
        // If user is already in onlineFriends array, update onlineStatus
        state.onlineFriends[index].onlineStatus = onlineStatus;
      } else {
        // If user is not in onlineFriends array, add the whole object to the array
        state.onlineFriends.push({
          _id,
          firstName,
          lastName,
          username,
          avatar,
          onlineStatus,
        });
      }
    },

    // remove friend based on friend's _id
    removeFriend: (state, action) => {
      const { friend_id } = action.payload;

      // Find index of friend to remove
      const index = state.friends.findIndex(
        (friend) => friend._id === friend_id
      );
      if (index !== -1) {
        // Remove friend from friends array
        state.friends.splice(index, 1);
      }
    },

    // update user information
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // update user information
    clearSearch: (state, action) => {
      state.searchResults = [];
      state.searchCount = null;
    },

    // logout reducer | being handled from auth
    logout: (state) => {
      state.isLoading = false;
      state.error = false;
      state.user = {
        _id: "",
        firstName: "",
        lastName: "",
        username: "",
        avatar: "",
        activityStatus: "",
        token: "",
      };
      state.friends = [];
      state.onlineFriends = [];
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
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      // --------- Search Friends Builder ---------
      .addCase(SearchFriends.pending, handlePending)
      .addCase(SearchFriends.fulfilled, (state, action) => {
        if (action.payload.usersFound === 0) {
          state.searchResults = null;
          state.searchCount = null;
        } else {
          state.searchResults = action.payload.friends;
          state.searchCount = action.payload.usersFound;
        }
        state.isLoading = false;
        state.error = false;
      })
      .addCase(SearchFriends.rejected, handleRejected)

      // --------- Get Friends Builder ---------
      .addCase(GetFriends.pending, handlePending)
      .addCase(GetFriends.fulfilled, (state, action) => {
        state.friends = action.payload.friends;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(GetFriends.rejected, handleRejected)

      // --------- Get Online Friends Builder ---------
      .addCase(GetOnlineFriends.pending, handlePending)
      .addCase(GetOnlineFriends.fulfilled, (state, action) => {
        state.onlineFriends = action.payload.onlineFriends;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(GetOnlineFriends.rejected, handleRejected);
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

// clear search functions
export function ClearSearch() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.clearSearch());
  };
}

export const {
  setShowFriendsMenu,
  updateUser,
  updateUsersList,
  updateOnlineUsers,
  userStatusUpdate,
  removeFriend,
  logout,
  user,
} = slice.actions;

export default slice.reducer;
