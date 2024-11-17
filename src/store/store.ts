import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import profileReducer from './reducers/userProfile.reducer';

const persistConfig = {
  key: 'root',
  storage
};

const customizedMiddleware = {
  serializableCheck: false
};

const rootReducer = combineReducers({
  profile: profileReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer as never);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
export default store;
