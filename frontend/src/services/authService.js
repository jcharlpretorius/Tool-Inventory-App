// Everything that wants to make a http requests to the backend is going to go through authService
import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
    // send login request to backend, employeeData has email and password
    const response = await axios.post(
      `${BACKEND_URL}/api/employees/login`,
      employeeData
    );
    if (response.statusText === 'OK') {
      toast.success('Login Successful');
    }
    return response.data; // all of the user data, except password
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
    // send logout request
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

// Get the login status -> useful for when redux state is refreshed
export const getLoginStatus = async () => {
  try {
    // ask backend if the user is logged in or not
    const response = await axios.get(`${BACKEND_URL}/api/employees/loggedin`);
    return response.data; // true or false
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
