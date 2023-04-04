import { createSlice } from '@reduxjs/toolkit';

// get name from local storage
const name = JSON.parse(localStorage.getItem('name'));

const initialState = {
  isLoggedIn: false,
  name: name ? name : '',
  employee: {
    firstName: '',
    minit: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    role: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // create actions
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      // store to local storage first. need to stringify it first
      localStorage.setItem('name', JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_EMPLOYEE(state, action) {
      const profile = action.payload;
      state.employee.name = profile.name;
      state.employee.email = profile.email;
      state.employee.phone = profile.phone;
      state.employee.bio = profile.bio;
      state.employee.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, ET_EMPLOYEE } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectEmployee = (state) => state.auth.employee;

export default authSlice.reducer;
