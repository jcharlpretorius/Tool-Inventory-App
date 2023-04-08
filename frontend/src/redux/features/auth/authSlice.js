import { createSlice } from '@reduxjs/toolkit';
// localStorage.clear(); // for debugging

// try to read the employee information in local storage
const firstName = JSON.parse(localStorage.getItem('firstName'));
const employeeId = JSON.parse(localStorage.getItem('employeeId'));

const initialState = {
  isLoggedIn: false,
  firstName: firstName ? firstName : '',
  employeeId: employeeId ? employeeId : '',
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
    SET_EMPLOYEE_ID(state, action) {
      localStorage.setItem('employeeId', JSON.stringify(action.payload));
      state.employeeId = action.payload;
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

export const { SET_LOGIN, SET_FIRSTNAME, SET_EMPLOYEE_ID, SET_EMPLOYEE } =
  authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectFirstName = (state) => state.auth.firstName;
export const selectEmployeeId = (state) => state.auth.employeeId;
export const selectRole = (state) => state.auth.role;
export const selectEmployee = (state) => state.auth.employee;

export default authSlice.reducer;
