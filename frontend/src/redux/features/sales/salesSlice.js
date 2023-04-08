import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import salesService from './salesService';
import { toast } from 'react-toastify';

const initialState = {
  recentSales: [],
  topSales: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get recent sales (sales sorted by date)
export const getRecentSales = createAsyncThunk(
  'sales/getRecent',
  async (_, thunkAPI) => {
    try {
      return await salesService.getRecentSales();
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

// Get recent sales (sales sorted by date)
export const getTopSalesMen = createAsyncThunk(
  'sales/top',
  async (_, thunkAPI) => {
    try {
      return await salesService.getTopSalesMen();
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

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get recent sales
      .addCase(getRecentSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.recentSales = action.payload;
      })
      .addCase(getRecentSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Get top sales
      .addCase(getTopSalesMen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopSalesMen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.topSales = action.payload;
      })
      .addCase(getTopSalesMen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.sales.isLoading;
export const selectRecentSales = (state) => state.sales.recentSales;
export const selectTopSales = (state) => state.sales.topSales;

export default salesSlice.reducer;
