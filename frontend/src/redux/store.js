import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import toolReducer from '../redux/features/tool/toolSlice';
import filterReducer from '../redux/features/tool/filterSlice';

// this is where we store the redux states

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tool: toolReducer,
    filter: filterReducer,
  },
});
