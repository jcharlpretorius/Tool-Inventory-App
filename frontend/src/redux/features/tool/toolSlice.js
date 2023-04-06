import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toolService from './toolService';
import { toast } from 'react-toastify';

const initialState = {
  tool: null, // initially we don't have access to any tools
  tools: [],
  isError: false, // any error from a http request
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a new Tool
export const createTool = createAsyncThunk(
  'tools/create',
  async (formData, thunkAPI) => {
    try {
      return await toolService.createTool(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all tools
export const getTools = createAsyncThunk(
  'tools/getAll',
  async (_, thunkAPI) => {
    try {
      return await toolService.getTools();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        error.body.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log('store value'); // temporary, just so it isn't empty for now
    },
  },
  // where we are going to store the responses we get from asyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(createTool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload); // action.payload is the tool that we added (json)
        // add tool to list of all tools
        state.tools.push(action.payload);
        toast.success('Tool added successfully');
      })
      .addCase(createTool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // whatever error we get from backend
        toast.error(action.payload);
      })
      .addCase(getTools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.tools = action.payload;
      })
      .addCase(getTools.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE } = toolSlice.actions;

export const selectIsLoading = (state) => state.tool.isLoading;

export default toolSlice.reducer;
