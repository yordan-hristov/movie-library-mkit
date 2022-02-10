import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import searchQueryReducer from './searchQuery/searchQuerySlice';
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userReducer,
    searchQuery: searchQueryReducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});