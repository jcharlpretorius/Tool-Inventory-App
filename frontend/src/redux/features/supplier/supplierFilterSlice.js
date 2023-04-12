import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredSuppliers: [],
};

const supplierFilterSlice = createSlice({
  name: 'supplierFilter',
  initialState,
  reducers: {
    FILTER_SUPPLIERS(state, action) {
      // Search supplier by name or email
      const { suppliers, search } = action.payload;
      const tempSuppliers = suppliers.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(search.toLowerCase()) ||
          supplier.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredSuppliers = tempSuppliers;
    },
  },
});

export const { FILTER_SUPPLIERS } = supplierFilterSlice.actions;
export const selectFilderedSuppliers = (state) =>
  state.supplierFilter.filteredSuppliers;

export default supplierFilterSlice.reducer;
