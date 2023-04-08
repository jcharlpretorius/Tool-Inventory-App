import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from './cartService';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  total: 0,
  customerId: '',
  paymentType: '',
};

// make a purchase. Send cart data to backend
export const makePurchase = createAsyncThunk(
  'cart/makePurchase',
  async (formData, thunkAPI) => {
    console.log(`inside cart slice`);
    try {
      return await cartService.makePurchase(formData);
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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // persist cart state on refresh
    LOAD_CART(state, action) {
      // load cart from local storage
      const savedCart = JSON.parse(localStorage.getItem('cart'));

      if (savedCart) {
        state.items = savedCart.items;
        state.total = savedCart.total;
      }
    },
    ADD_ITEM(state, action) {
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
      localStorage.setItem('cart', JSON.stringify(state));
    },
    REMOVE_ITEM(state, action) {
      const itemId = action.payload;
      const itemToRemove = state.items.find((i) => i.toolId === itemId);

      if (!itemToRemove) {
        return;
      }

      state.items = state.items.filter((i) => i.toolId !== itemId);
      state.total -= itemToRemove.price * itemToRemove.cartQty;
      // save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    INCREMENT_QUANTITY(state, action) {
      const itemId = action.payload;
      const itemToIncrement = state.items.find((i) => i.toolId === itemId);

      if (itemToIncrement) {
        itemToIncrement.cartQty++;
        state.total += itemToIncrement.price;
      }
      // save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    DECREMENT_QUANTITY(state, action) {
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
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    CLEAR_CART(state) {
      state.items = [];
      state.total = 0;
      // delete cart from local storage
      localStorage.removeItem('cart');
    },
    SET_TOTAL(state, action) {
      state.total = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // make purchase
      .addCase(makePurchase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makePurchase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        // can I add the new sale to the list of sales?///////////////
        toast.success('Purchase completed successfully');
      })
      .addCase(makePurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  LOAD_CART,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  SET_TOTAL,
} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.total;
export default cartSlice.reducer;
