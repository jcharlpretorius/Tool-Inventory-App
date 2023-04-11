import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderCartService from './orderCartService';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  total: 0,
};

// make an order. Send orderCart data to backend
export const makeOrder = createAsyncThunk(
  'orderCart/makeOrder',
  async (formData, thunkAPI) => {
    try {
      return await orderCartService.makeOrder(formData);
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

const orderCartSlice = createSlice({
  name: 'orderCart',
  initialState,
  reducers: {
    // persist orderCart state on refresh
    LOAD_ORDER_CART(state, action) {
      // load orderCart from local storage
      const savedCart = JSON.parse(localStorage.getItem('orderCart'));

      if (savedCart) {
        state.items = savedCart.items;
        state.total = savedCart.total;
      }
    },
    ADD_ORDER_ITEM(state, action) {
      const item = { ...action.payload }; // props are not extensible, can't add cartQty to tool
      const existingItem = state.items.find((i) => i.toolId === item.toolId);

      if (existingItem) {
        existingItem.cartQty += 1; // increment cartQty
      } else {
        item.cartQty = 1;
        state.items.push(item); // add item to items list
      }

      state.total += item.price * item.cartQty;
      // save cart to local storage
      localStorage.setItem('orderCart', JSON.stringify(state));
    },
    REMOVE_ORDER_ITEM(state, action) {
      const itemId = action.payload;
      const itemToRemove = state.items.find((i) => i.toolId === itemId);

      if (!itemToRemove) {
        return;
      }

      state.items = state.items.filter((i) => i.toolId !== itemId);
      state.total -= itemToRemove.price * itemToRemove.cartQty;
      // save cart to local storage
      localStorage.setItem('orderCart', JSON.stringify(state));
    },
    INCREMENT_ORDER_QUANTITY(state, action) {
      const itemId = action.payload;
      const itemToIncrement = state.items.find((i) => i.toolId === itemId);

      if (itemToIncrement) {
        itemToIncrement.cartQty++;
        state.total += itemToIncrement.price;
      }
      // save cart to local storage
      localStorage.setItem('orderCart', JSON.stringify(state));
    },
    DECREMENT_ORDER_QUANTITY(state, action) {
      const itemId = action.payload;
      const itemToDecrement = state.items.find((i) => i.toolId === itemId);

      if (itemToDecrement) {
        itemToDecrement.cartQty--;

        // remove the item from the cart
        if (itemToDecrement.cartQty === 0) {
          state.items = state.items.filter((i) => i.toolId !== itemId);
        }
        // Don't allow setting quantity below 0
        // if (itemToDecrement.cartQty > 0) {
        //   itemToDecrement.cartQty--;
        // }

        state.total -= itemToDecrement.price;
        // save cart to local storage
        localStorage.setItem('orderCart', JSON.stringify(state));
      }
    },
    CLEAR_ORDER_CART(state) {
      state.items = [];
      state.total = 0;
      // delete cart from local storage
      localStorage.removeItem('orderCart');
    },
    SET_ORDER_TOTAL(state, action) {
      state.total = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // make order
      .addCase(makeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        toast.success('Order completed successfully');
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  LOAD_ORDER_CART,
  ADD_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
  CLEAR_ORDER_CART,
  INCREMENT_ORDER_QUANTITY,
  DECREMENT_ORDER_QUANTITY,
  SET_ORDER_TOTAL,
} = orderCartSlice.actions;

export const selectItems = (state) => state.orderCart.items;
export const selectTotal = (state) => state.orderCart.total;
export default orderCartSlice.reducer;
