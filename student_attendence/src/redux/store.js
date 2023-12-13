import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer_or_slice/authReducer";

export const store = configureStore({
    reducer: authReducer
})