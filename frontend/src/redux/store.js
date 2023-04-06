import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import toolReducer from '../redux/features/tool/toolSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tool: toolReducer,
  },
});
