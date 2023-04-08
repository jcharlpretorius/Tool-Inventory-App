import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/orders/`;

const makeOrder = async (formData) => {
  // remove console logs after finished debugging
  console.log(`Inside orderCart service`);
  console.log(`url: ${API_URL}`);
  const response = await axios.post(API_URL, formData);
  console.log(`after postrequest in order cart service  `);

  return response.data;
};

const orderCartService = {
  makeOrder,
};
export default orderCartService;
