import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user from localStorage insated of default state
// const userDefaultState = {
//   _id: null,
//   firstname: null,
//   lastname: null,
//   email: null,
//   mobile: null,
//   token: null,
// };
// JSON.parse if it is available else return null
const getUserfromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  orders: [], //orders
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

//this login is exported to login page
export const login = createAsyncThunk(
  'auth/admin-login', // the auth then d api url
  async (user, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//order slice
export const getOrders = createAsyncThunk(
  'order/get-orders', // the auth then d api url
  async (thunkApi) => {
    try {
      return await authService.getOrders(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//getorderby userId
export const getOrderByUser = createAsyncThunk(
  'order/get-order', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await authService.getOrders(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth', // auth is used to save user in redux
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = 'success';
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = 'success';
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
