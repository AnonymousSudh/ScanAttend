// this is our second step of tellling the store about the reducer
import { configureStore } from "@reduxjs/toolkit"; 
import authReducer from "./reducer_or_slice/authReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // other reducers...
      },    
   
})