import { createAction } from '@reduxjs/toolkit';

// Action to update the clients state
export const getAllClients = createAction('client/getAllClients');

console.log("getAllClients")