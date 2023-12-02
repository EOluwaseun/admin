import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import couponService from './couponService';

export const getCoupons = createAsyncThunk(
  'coupon/get-coupon', // the auth then d api url
  async (thunkApi) => {
    try {
      return await couponService.getCoupons(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createCoupons = createAsyncThunk(
  'coupon/create-coupons', // the auth then d api url
  //note data before thunkApi
  async (couponData, thunkApi) => {
    try {
      return await couponService.createCoupon(couponData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// update coupon
export const updateACoupon = createAsyncThunk(
  'coupon/update-coupon', // the auth then d api url

  async (couponData, thunkApi) => {
    try {
      return await couponService.updateCoupon(couponData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//get single brand
export const getACoupon = createAsyncThunk(
  'coupon/geta-coupon', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await couponService.getCoupon(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
//get single brand
export const deleteACoupon = createAsyncThunk(
  'coupon/delete-coupon', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await couponService.deleteCoupon(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// reset state
export const resetState = createAction('Reset_all');

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCoupons = action.payload; //create on the fly
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.couponName = action.payload.name;
        state.couponDiscount = action.payload.discount;
        state.couponExpiry = action.payload.expiry;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedCoupon = action.payload;
      })
      .addCase(updateACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
