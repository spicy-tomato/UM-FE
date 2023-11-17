import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  LocalStorageConstant,
  RoleConstantValue,
} from '../../shared/constants';

type User = {
  extraData: Record<string, string>;
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  isMale: boolean;
  address: string | null;
  role: RoleConstantValue;
  phoneNumber: string | null;
};

type State = {
  token: string | null;
  user: User | null;
};

const initialState: State = {
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
