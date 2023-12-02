import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from './customerService';

export const getUsers = createAsyncThunk(
  'customer/get-customers', // the auth then d api url
  async (thunkApi) => {
    try {
      return await customerService.getUsers();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const customerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError= false
        state.customers = action.payload;
        state.message = 'success'
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default customerSlice.reducer;
