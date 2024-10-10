import { configureStore } from '@reduxjs/toolkit';
import storageReducer from './storageSlice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Redux-persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Persisted storage reducer
const persistedReducer = persistReducer(persistConfig, storageReducer);

// Configure store
export const store = configureStore({
  reducer: {
    storage: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions as they contain non-serializable values
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor for persisting the store
export const persistor = persistStore(store);

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
