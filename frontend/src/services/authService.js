// Everything that wants to make a http requests to the backend is going to go through authService
import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.REACT_BACKEND_URL;

// Validate email address
export const validateEmail = (email) => {
  // regex to check if email is a valid format
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Login employee
export const loginUser = async (employeeData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/employees/login`,
      employeeData
    );
    if (response.statusText === 'OK') {
      toast.success('Login Successful');
    }
    return response.data;
  } catch (error) {
    // get the error message, no matter the format we recieve it
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Logout the Emloyee
export const logoutEmployee = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/employees/logout`);
  } catch (error) {
    // get the error message, no matter the format we recieve it
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get the login status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/employees/loggedin`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
