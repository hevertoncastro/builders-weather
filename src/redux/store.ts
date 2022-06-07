import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

// Reducers
import settings from './reducers/settings';

// Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['language', 'units', 'theme'],
};

// Combining reducers
const reducers = combineReducers({
  settings,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Configuring store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
