// this is our second step of tellling the store about the reducer
import { configureStore } from "@reduxjs/toolkit"; 
import authReducer from "./reducer_or_slice/authReducer";
import { persistStore,persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';




const persistConfig= {
  key:'persist-key',
  storage:AsyncStorage
}
const persistedAuthReducer  = persistReducer(persistConfig,authReducer)
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer ,
        // other reducers...
      },    
      middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})
export const persistor = persistStore(store);




 // prevoius code
// // this is our second step of tellling the store about the reducer
// import { configureStore } from "@reduxjs/toolkit"; 
// import authReducer from "./reducer_or_slice/authReducer";

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         // other reducers...
//       },    
   
// })