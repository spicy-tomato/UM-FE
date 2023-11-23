import { LocalStorageConstant } from '@constants';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState } from '../states/authState';

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken: (state, actions) => {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${actions.payload}`;
      localStorage.setItem(LocalStorageConstant.token, actions.payload);

      state.token = actions.payload;
    },
    updateUser: (state, actions) => {
      state.user = actions.payload;
    },
    logOut: (state) => {
      axios.defaults.headers.common['Authorization'] = null;
      localStorage.removeItem(LocalStorageConstant.token);

      state.user = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateToken, updateUser, logOut } = authSlice.actions;

export default authSlice.reducer;
