/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit'
import 'react-redux'

export const authSlice = createSlice({
  name: 'Auth',
  initialState: {
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    setCredentials: (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      },
    logout: (state, action) => {
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');
      localStorage.removeItem('email');
      localStorage.removeItem('phone');
    }
  }
})

export const userSlice = createSlice({
  name: 'UserData',
  initialState: {
    id: localStorage.getItem('id') || null,
    firstName: localStorage.getItem('first_name') || null,
    lastName: localStorage.getItem('last_name') || null,
    email: localStorage.getItem('email') || null,
    phone: localStorage.getItem('phone') || null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;

      localStorage.setItem('id', action.payload.id);
      localStorage.setItem('first_name', action.payload.first_name);
      localStorage.setItem('last_name', action.payload.last_name);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('phone', action.payload.phone);
    },
  }
})

export const errorSlice = createSlice({
  name: 'ErrorData',
  initialState: {
    errorCode: null,
    errorText: null,
  },
  reducers: {
    setError: (state, action) => {
      state.errorCode = action.payload.code;
      state.errorText = action.payload.text;
    },
    clearError: (state) => {
      state.errorCode = null;
      state.errorText = null;
    },
  },
})

export const { setCredentials, logout } = authSlice.actions;
export const { setUserData} = userSlice.actions;
export const { setError, clearError } = errorSlice.actions;

export const errorHandler = data => {
  return (dispatch, getState) => {
    dispatch(setError(data))
    setTimeout(() => {
      dispatch(clearError())
    }, 2000);
  }
}
