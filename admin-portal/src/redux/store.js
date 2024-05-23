import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from './reducer/authReducer';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'persist-key',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const authStore = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(authStore);
