import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import postsTypeReducer from "../features/postsTypeSlice"
import searchReducer from "../features/searchSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    postsType: postsTypeReducer,
    search: searchReducer,
  },
});
