import { createSlice, configureStore, combineReducers, createSelector } from '@reduxjs/toolkit'
import 'react-redux'

const authSlice = createSlice({
  name: 'Auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    tokenType: null 
  },
  reducers: {
    setCredentials: (state, action) => {
        state.token = action.payload.token;
        state.tokenType = action.payload.tokenType;
        localStorage.setItem('token', action.payload.token);
      },
    logout: (state, action) => {
      state.token = null;
      state.tokenType = null;
    }
  }
})

const userSlice = createSlice({
  name: 'UserData',
  initialState: {
    firstName: localStorage.getItem('first_name') || null,
    lastName: localStorage.getItem('last_name') || null,
    email: localStorage.getItem('email') || null,
    phone: localStorage.getItem('phone') || null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;

      // Save each value separately in localStorage
      localStorage.setItem('first_name', action.payload.first_name);
      localStorage.setItem('last_name', action.payload.last_name);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('phone', action.payload.phone);
    },
  }
})

export const { setCredentials, logout } = authSlice.actions;
export const { setUserData} = userSlice.actions;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});