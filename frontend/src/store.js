import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice, errorSlice } from './API/slice';
import { chatHistorySlice } from './Routes/Chat/slice';
import 'react-redux'

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    error: errorSlice.reducer,
    chat: chatHistorySlice.reducer,
  });

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });