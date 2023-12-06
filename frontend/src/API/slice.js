import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit'
import 'react-redux'

const authSlice = createSlice({
  name: 'Auth',
  initialState: {
    token: null,
    tokenType: null 
  },
  reducers: {
    setCredentials: (state, action) => {
        state.token = action.payload.token;
        state.tokenType = action.payload.tokenType;
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
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
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
});