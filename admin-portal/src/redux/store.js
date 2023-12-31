import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducer/authReducer'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'persist-key',
    storage
}
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const authStore = configureStore({
    reducer: persistedAuthReducer
})

export const persistor = persistStore(authStore);
