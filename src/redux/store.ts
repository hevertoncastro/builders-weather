import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

// Reducers
import settings from './reducers/settings';

// Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings'],
};

// Combining reducers
const reducers = combineReducers({
  settings: persistReducer(persistConfig, settings),
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Configuring store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
