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
  }
})

const userSlice = createSlice({
    name: "UserData",
    initialState: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.firstName = action.payload.first_name;
            state.lastName = action.payload.last_name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        }
    }
})

export const { setCredentials } = authSlice.actions;
export const { setUserData } = userSlice.actions;

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