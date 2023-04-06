import axios from 'axios';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/tools/`;

// Create New Tool
const createTool = async (formData) => {
  const response = await axios.post(`${API_URL}`, formData);
  return response.data; // this is our tool
};

// Get all tools
const getTools = async () => {
  const response = await axios.get(API_URL);
  return response.data; // this is all of the tools
};

// Delete a tool
const deleteTool = async (toolId) => {
  const response = await axios.delete(API_URL + toolId);
  return response.data;
};

const toolService = {
  createTool,
  getTools,
  deleteTool,
};

export default toolService;
