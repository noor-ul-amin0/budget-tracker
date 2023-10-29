import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authService';
import authReducer from './auth/authSlice';
import toastReducer from './toast/toastSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { budgetLimitApi } from './user/userService';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [budgetLimitApi.reducerPath]: budgetLimitApi.reducer,
    auth: persistedAuthReducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      budgetLimitApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
