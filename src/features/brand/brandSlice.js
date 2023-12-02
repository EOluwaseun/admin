import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import brandService from './brandService';

export const getBrands = createAsyncThunk(
  'brand/get-brands', // the auth then d api url
  async (thunkApi) => {
    try {
      return await brandService.getBrands(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createdBrand = createAsyncThunk(
  'brand/create-brand', // the auth then d api url

  async (brandData, thunkApi) => {
    try {
      return await brandService.createBrand(brandData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// create brand
export const updateABrand = createAsyncThunk(
  'brand/update-brand', // the auth then d api url

  async (brand, thunkApi) => {
    try {
      return await brandService.updateBrand(brand); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//get single brand
export const getABrand = createAsyncThunk(
  'brand/get-brand', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await brandService.getBrand(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
//get single brand
export const deleteABrand = createAsyncThunk(
  'brand/delete-brand', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await brandService.deleteBrand(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// reset state
export const resetState = createAction('Reset_all');
const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createdBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createdBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createBrand = action.payload; // name here must be different
      })
      .addCase(createdBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brandName = action.payload.title; //only the title needed here
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload;
      })
      .addCase(updateABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
