import axios from 'axios';
import { BACKEND_URL } from '../../../services/authService';

const API_URL = `${BACKEND_URL}/api/tools/`;

// Create New Tool
const createTool = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all tools
const getTools = async () => {
  const response = await axios.get(API_URL);
  // console.log(`response.data: ${JSON.stringify(response.data)}`);
  return response.data;
};

// Get single tool
const getTool = async (toolId) => {
  const response = await axios.get(API_URL + toolId);
  return response.data;
};

// Delete a tool
const deleteTool = async (toolId) => {
  const response = await axios.delete(API_URL + toolId);
  return response.data;
};

// Update a tool
const updateTool = async (toolId, formData) => {
  const response = await axios.put(`${API_URL}${toolId}`, formData);
  return response.data;
};

const toolService = {
  createTool,
  getTools,
  getTool,
  deleteTool,
  updateTool,
};

export default toolService;
