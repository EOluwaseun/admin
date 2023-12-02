import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import bCategoryService from './bCategoryService';

export const getblogCat = createAsyncThunk(
  //will be imported to d screen
  'blog-category/get-blogCat', // the auth then d api url
  async (thunkApi) => {
    try {
      return await bCategoryService.getblogCats(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// create brand
export const createdBlogCat = createAsyncThunk(
  'blog-category/create-blogcat', // the auth then d api url

  async (blogData, thunkApi) => {
    try {
      return await bCategoryService.createBlogcat(blogData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateABlogCat = createAsyncThunk(
  'blog-category/update-blogcat', // the auth then d api url

  async (blogCat, thunkApi) => {
    try {
      return await bCategoryService.updateBlogCat(blogCat); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getABlogCat = createAsyncThunk(
  'blog-category/geta-blogcat', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await bCategoryService.getBlogCat(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteABlogCat = createAsyncThunk(
  'blog-category/delete-blogcat', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await bCategoryService.deleteBlogCat(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// reset state
export const resetState = createAction('Reset_all');

const initialState = {
  bcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const bCategorySlice = createSlice({
  name: 'bcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getblogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bcategories = action.payload;
      })
      .addCase(getblogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createdBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createdBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogcat = action.payload;
      })
      .addCase(createdBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogcatName = action.payload.title;
      })
      .addCase(getABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedBlogcat = action.payload;
      })
      .addCase(updateABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedBlogcat = action.payload;
      })
      .addCase(deleteABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bCategorySlice.reducer;
