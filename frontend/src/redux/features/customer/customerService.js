import axios from 'axios';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/customers/`;

// Create New Tool
const createCustomer = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all customers
const getCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single customer by id
const getCustomer = async (customerId) => {
  const response = await axios.get(API_URL + customerId);
  return response.data;
};

// Get single customer by email
const getCustomerByEmail = async (email) => {
  console.log(`email in getCustomerby email in service: ${email}`);

  const response = await axios.post(`${API_URL}email/`, { email });

  console.log(
    `Response in getCustomerbyEmail in service: ${JSON.stringify(
      response.data
    )}`
  );

  return response.data;
};

// Delete a customer
const deleteCustomer = async (customerId) => {
  const response = await axios.delete(API_URL + customerId);
  return response.data;
};

// Update a customer
const updateCustomer = async (customerId, formData) => {
  const response = await axios.put(`${API_URL}${customerId}`, formData);
  return response.data;
};

const customerService = {
  createCustomer,
  getCustomers,
  getCustomer,
  getCustomerByEmail,
  deleteCustomer,
  updateCustomer,
};

export default customerService;
