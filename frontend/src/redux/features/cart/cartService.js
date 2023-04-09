import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/purchases/`;

const makePurchase = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};

const cartService = {
  makePurchase,
};
export default cartService;
