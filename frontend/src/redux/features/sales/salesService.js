import axios from 'axios';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/sales/`;

const getRecentSales = async (formData) => {
  const response = await axios.get(`${API_URL}/recent`);
  // console.log('getRecentSales');
  // console.log(`recent sales: ${JSON.stringify(response.data)}`);
  return response.data;
};

const getTopSalesMen = async (formData) => {
  const response = await axios.get(`${API_URL}/top`);
  // console.log('getTopSalesMen');
  // console.log(`Top sales: ${JSON.stringify(response.data)}`);
  return response.data;
};

const salesService = {
  getRecentSales,
  getTopSalesMen,
};
export default salesService;
