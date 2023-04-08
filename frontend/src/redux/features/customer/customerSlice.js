import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from './customerService';
import { toast } from 'react-toastify';

const initialState = {
  // customer: null, // initially we don't have access to any customers
  customer: {
    firstName: '',
    minit: '',
    lastName: '',
    address: '',
    email: '',
  },
  customers: [],
  isError: false, // any error from a http request
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a new customer
export const createCustomer = createAsyncThunk(
  'customers/create',
  async (formData, thunkAPI) => {
    try {
      return await customerService.createCustomer(formData);
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

// Get all customers
export const getCustomers = createAsyncThunk(
  'customers/getAll',
  async (_, thunkAPI) => {
    try {
      return await customerService.getCustomers();
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

// Delete a customer
export const deleteCustomer = createAsyncThunk(
  'customers/delete',
  async (customerId, thunkAPI) => {
    try {
      return await customerService.deleteCustomer(customerId);
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

// Get a customer by ID
export const getCustomer = createAsyncThunk(
  'customers/getCustomer',
  async (customerId, thunkAPI) => {
    try {
      return await customerService.getCustomer(customerId);
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

// Get a customer by their email
export const getCustomerByEmail = createAsyncThunk(
  'customers/getCustomerByEmail',
  async (email, thunkAPI) => {
    try {
      console.log(`email in getCustomerbyEmail in slice: ${email}`);
      return await customerService.getCustomerByEmail(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // console.log('service error');
      console.log(message);
      // why do I have to do this here?
      if (email) {
        toast.error(`No customer with email ${email} found`);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update customer
export const updateCustomer = createAsyncThunk(
  'Customer/updateCustomer',
  async ({ customerId, formData }, thunkAPI) => {
    try {
      return await customerService.updateCustomer(customerId, formData);
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

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  // where we are going to store the responses we get from asyncThunk
  extraReducers: (builder) => {
    builder

      // create customer
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        // add customer to list of all customers
        state.customers.push(action.payload);
        toast.success('Customer added successfully');
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get all customers
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Customer deleted successfully');
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Get single customer
      .addCase(getCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customer = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Get single customer by email
      .addCase(getCustomerByEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customer = action.payload;
      })
      .addCase(getCustomerByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Update customer
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Customer updated successfully');
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoadingCustomer = (state) => state.customer.isLoading;
export const selectCustomer = (state) => state.customer.customer;
export const selectCustomers = (state) => state.customer.customers;

export default customerSlice.reducer;
