import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredCustomers: [],
};

const customerFilterSlice = createSlice({
  name: 'customerFilter',
  initialState,
  reducers: {
    FILTER_CUSTOMERS(state, action) {
      // Search customer by first name or last name or email
      const { customers, search } = action.payload;
      const tempCustomers = customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredCustomers = tempCustomers;
    },
  },
});

export const { FILTER_CUSTOMERS } = customerFilterSlice.actions;
export const selectFilderedCustomers = (state) =>
  state.customerFilter.filteredCustomers;

export default customerFilterSlice.reducer;
