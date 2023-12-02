import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import pCategoryService from './pcategoryService';

export const getProductCategories = createAsyncThunk(
  'productCategory/get-categories', // the auth then d api url
  async (thunkApi) => {
    try {
      return await pCategoryService.getProductCategories(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//create category
// remember to always pass 2 arguments
export const createProductCategories = createAsyncThunk(
  'productCategory/create-categories', // the auth then d api url
  async (categoryData, thunkApi) => {
    try {
      return await pCategoryService.createCategories(categoryData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// create brand
export const updateAProductCagory = createAsyncThunk(
  'productCategory/update-category', // the auth then d api url

  async (category, thunkApi) => {
    try {
      return await pCategoryService.updateProductCategory(category); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//get single brand
export const getAProductCategory = createAsyncThunk(
  'productCategory/get-category', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await pCategoryService.getProductCategory(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
//get single brand
export const deleteAProductCategory = createAsyncThunk(
  'productCategory/delete-category', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await pCategoryService.deleteProductCategory(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// reset state
export const resetState = createAction('Reset_all');

const initialState = {
  pCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const pCategorySlice = createSlice({
  name: 'pCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pCategories = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createCategory = action.payload;
      })
      .addCase(createProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAProductCagory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProductCagory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateAProductCagory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pCategoryName = action.payload.title;
      })
      .addCase(getAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;
