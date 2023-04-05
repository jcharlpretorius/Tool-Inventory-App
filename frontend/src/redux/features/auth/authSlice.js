import { createSlice } from '@reduxjs/toolkit';

const firstName = JSON.parse(localStorage.getItem('firstName'));

const initialState = {
  isLoggedIn: false,
  firstName: firstName ? firstName : '',
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
  name: 'auth', // this is the slice's name, don't get confused
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_FIRSTNAME(state, action) {
      localStorage.setItem('firstName', JSON.stringify(action.payload));
      state.firstName = action.payload;
    },
    SET_EMPLOYEE(state, action) {
      const profile = action.payload;
      state.employee.employeeId = profile.employeeId;
      state.employee.firstName = profile.firstName;
      state.employee.minit = profile.minit;
      state.employee.lastName = profile.lastName;
      state.employee.phoneNumber = profile.phoneNumber;
      state.employee.email = profile.email;
      state.employee.role = profile.role;
    },
  },
});

export const { SET_LOGIN, SET_FIRSTNAME, SET_EMPLOYEE } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectFirstName = (state) => state.auth.firstName;
export const selectRole = (state) => state.auth.role;
export const selectEmployee = (state) => state.auth.employee;

export default authSlice.reducer;
