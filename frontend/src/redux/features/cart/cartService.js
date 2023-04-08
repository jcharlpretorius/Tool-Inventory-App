import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/purchases/`;

const makePurchase = async (formData) => {
  console.log(`Inside cart service`);
  console.log(`url: ${API_URL}`);
  const response = await axios.post(API_URL, formData);
  console.log(`after post request `);

  return response.data;
};

const cartService = {
  makePurchase,
};
export default cartService;
