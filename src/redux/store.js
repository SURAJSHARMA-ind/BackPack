
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import seedGeneratorReducer from './wallet/seedGeneratorSlice';
import navigateReducer from './wallet/navigateSlice';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
  seedGenerator: seedGeneratorReducer,
  navigator: navigateReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['navigate'],  // Only persist the navigate slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

// 5. Setup persistor
export const persistor = persistStore(store);