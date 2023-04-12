import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import toolReducer from '../redux/features/tool/toolSlice';
import filterReducer from '../redux/features/tool/filterSlice';
import cartReducer from '../redux/features/cart/cartSlice';
import orderCartReducer from '../redux/features/orderCart/orderCartSlice';
import customerSlice from './features/customer/customerSlice';
import customerFilterSlice from './features/customer/customerFilterSlice';
import salesSlice from './features/sales/salesSlice';
import supplierSlice from './features/supplier/supplierSlice';
import supplierFilterSlice from './features/supplier/supplierFilterSlice';

// this is where we store all of the redux states

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tool: toolReducer,
    filter: filterReducer,
    cart: cartReducer,
    orderCart: orderCartReducer,
    customer: customerSlice,
    customerFilter: customerFilterSlice,
    sales: salesSlice,
    supplier: supplierSlice,
    supplierFilter: supplierFilterSlice,
  },
});
