import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supplierService from './supplierService';
import { toast } from 'react-toastify';

const initialState = {
  supplier: {
    supplierId: 0,
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
  },
  suppliers: [],
  isError: false, // any error from a http request
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a new supplier
export const createSupplier = createAsyncThunk(
  'suppliers/create',
  async (formData, thunkAPI) => {
    try {
      return await supplierService.createSupplier(formData);
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

// Get all suppliers
export const getSuppliers = createAsyncThunk(
  'suppliers/getAll',
  async (_, thunkAPI) => {
    try {
      return await supplierService.getSuppliers();
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

// Delete a supplier
export const deleteSupplier = createAsyncThunk(
  'suppliers/delete',
  async (supplierId, thunkAPI) => {
    try {
      return await supplierService.deleteSupplier(supplierId);
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

// Get a supplier by ID
export const getSupplier = createAsyncThunk(
  'suppliers/getSupplier',
  async (supplierId, thunkAPI) => {
    try {
      return await supplierService.getSupplier(supplierId);
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

// Update supplier
export const updateSupplier = createAsyncThunk(
  'Supplier/updateSupplier',
  async ({ supplierId, formData }, thunkAPI) => {
    try {
      return await supplierService.updateSupplier(supplierId, formData);
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

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // create supplier
      .addCase(createSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        // add supplier to list of all suppliers
        state.suppliers.push(action.payload);
        toast.success('Supplier added successfully');
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get all suppliers
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete supplier
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Supplier deleted successfully');
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Get single supplier
      .addCase(getSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.supplier = action.payload;
      })
      .addCase(getSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Update supplier
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Supplier updated successfully');
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoadingSupplier = (state) => state.supplier.isLoading;
export const selectSupplier = (state) => state.supplier.supplier;
export const selectSupplierS = (state) => state.supplier.suppliers;

export default supplierSlice.reducer;
