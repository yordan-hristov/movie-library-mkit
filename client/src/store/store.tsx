import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import searchQueryReducer from './searchQuery/searchQuerySlice';

export default configureStore({
    reducer: {
        user: userReducer,
        searchQuery: searchQueryReducer
    }
});