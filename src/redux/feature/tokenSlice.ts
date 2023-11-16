import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken: (state, actions) => {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${actions.payload}`;
      localStorage.setItem('token', actions.payload);
      state.token = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateToken } = tokenSlice.actions;

export default tokenSlice.reducer;
