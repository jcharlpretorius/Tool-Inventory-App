import axios from 'axios';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/orders/`;

const makeOrder = async (formData) => {
  console.log(`url: ${API_URL}`);
  const response = await axios.post(API_URL, formData);
  return response.data;
};

const orderCartService = {
  makeOrder,
};
export default orderCartService;
