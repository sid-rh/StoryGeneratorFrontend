import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import storyReducer from '../features/story/storySlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        story:storyReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware(),
    devTools:true,
});

export default store;