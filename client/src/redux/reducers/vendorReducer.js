import { createSlice } from '@reduxjs/toolkit';
import { getAllVendors } from '../actions/vendorActions';  // Import the action creator

// Initial state
const initialState = {
  vendors: [],
  error: false,
};

// Create slice
const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {},  // No local reducers here
  extraReducers: (builder) => {
    // Listen for the getAllVendors action
    builder.addCase(getAllVendors, (state, action) => {
      console.log('getAllVendors Reducer triggered');
      state.vendors = action.payload;
    });
  },
});

// Export the reducer to be used in the store
export default vendorSlice.reducer;
