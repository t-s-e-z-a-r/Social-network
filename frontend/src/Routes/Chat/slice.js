/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit'
import 'react-redux'

export const chatHistorySlice = createSlice({
    name: 'Chat data',
    initialState: {
        chatHistory: null,
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
    },
    reducers: {
        setChatHistory: (state, action) => {
            state.chatHistory = action.payload;
        },
        setUserChatData: (state, action) => {
            state.id = action.payload.id;
            state.firstName = action.payload.first_name;
            state.lastName = action.payload.last_name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        updateChatHistory: (state, action) => {
            state.chatHistory = [...state.chatHistory, action.payload];
        }
    }
})

export const {setChatHistory, setUserChatData, updateChatHistory} = chatHistorySlice.actions 