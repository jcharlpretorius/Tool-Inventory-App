import axios from 'axios';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/tools`;

// Create New Tool
const createTool = async (formData) => {
  const response = await axios.post(`${API_URL}`, formData);
  return response.data; // this is our tool
};

// Get all tools
const getTools = async () => {
  console.log(` API_URL: ${API_URL}`); ////////////////////////////////
  const response = await axios.get(`${API_URL}`);
  console.log(`in toolService, get all tools response:: ${response}`); ////////////////////////
  return response.data; // this is all of the tools
};

const toolService = {
  createTool,
  getTools,
};

export default toolService;
