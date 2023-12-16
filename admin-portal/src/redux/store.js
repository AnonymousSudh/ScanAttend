import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducer/authReducer'

export const  authStore = configureStore({
    reducer:authReducer
})