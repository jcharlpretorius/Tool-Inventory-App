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

// Delete a tool
export const deleteTool = createAsyncThunk(
  'tools/delete',
  async (toolId, thunkAPI) => {
    try {
      return await toolService.deleteTool(toolId);
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

// Get a tool
export const getTool = createAsyncThunk(
  'tools/getTool',
  async (toolId, thunkAPI) => {
    try {
      return await toolService.getTool(toolId);
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
// Update tool
export const updateTool = createAsyncThunk(
  'Tool/updateTool',
  async ({ toolId, formData }, thunkAPI) => {
    try {
      return await toolService.updateTool(toolId, formData);
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

      // create tool
      .addCase(createTool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        // add tool to list of all tools
        state.tools.push(action.payload);
        toast.success('Tool added successfully');
      })
      .addCase(createTool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get all tools
      .addCase(getTools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.tools = action.payload;
      })
      .addCase(getTools.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete tool
      .addCase(deleteTool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Tool deleted successfully');
      })
      .addCase(deleteTool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Get single tool
      .addCase(getTool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tool = action.payload;
      })
      .addCase(getTool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Update tool
      .addCase(updateTool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Tool updated successfully');
      })
      .addCase(updateTool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE } = toolSlice.actions;

export const selectIsLoading = (state) => state.tool.isLoading;
export const selectTool = (state) => state.tool.tool;

export default toolSlice.reducer;
