import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import blogService from './blogService';

export const getBlogs = createAsyncThunk(
  'blog/get-blogs', // the auth then d api url
  async (thunkApi) => {
    try {
      return await blogService.getBlogs(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createBlogs = createAsyncThunk(
  'blog/create-blog', // the auth then d api url
  //note data before thunkApi
  async (blogData, thunkApi) => {
    try {
      return await blogService.createBlog(blogData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getABlog = createAsyncThunk(
  'blog/get-blog', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await blogService.getBlog(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateABlog = createAsyncThunk(
  'blog/update-blog', // the auth then d api url

  async (blogData, thunkApi) => {
    try {
      return await blogService.updateBlog(blogData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteABlog = createAsyncThunk(
  'blog/delete-blog', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await blogService.deleteBlog(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// reset state
export const resetState = createAction('Reset_all');

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdBlogs = action.payload;
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogName = action.payload.title;
        state.blogDesc = action.payload.description;
        state.blogCategory = action.payload.category;
        state.blogImages = action.payload.images;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
      })
      .addCase(updateABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
