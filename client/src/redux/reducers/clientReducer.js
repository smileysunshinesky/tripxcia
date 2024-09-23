import { createSlice } from '@reduxjs/toolkit';
import { getAllClients } from '../actions/clientActions';  // Import the action creator

// Initial state
const initialState = {
  clients: [],
  error: false,
};

// Create slice
const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},  // No local reducers here
  extraReducers: (builder) => {
    // Listen for the getAllClients action
    builder.addCase(getAllClients, (state, action) => {
      console.log('getAllClients Reducer triggered');
      state.clients = action.payload;  // Update the clients state
    });
  },
});

// Export the reducer to be used in the store
export default clientSlice.reducer;
