import axios from 'axios';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/suppliers/`;

// Create New supplier
const createSupplier = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all suppliers
const getSuppliers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single supplier by id
const getSupplier = async (supplierId) => {
  const response = await axios.get(API_URL + supplierId);
  return response.data;
};

// Delete a supplier
const deleteSupplier = async (supplierId) => {
  const response = await axios.delete(API_URL + supplierId);
  return response.data;
};

// Update a supplier
const updateSupplier = async (supplierId, formData) => {
  console.log('in service');
  console.log(`formData: ${JSON.stringify(formData)}`);
  const response = await axios.put(`${API_URL}${supplierId}`, formData);
  return response.data;
};

const supplierService = {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};

export default supplierService;
