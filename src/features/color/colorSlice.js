import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './colorService';

export const getColors = createAsyncThunk(
  'color/get-colors', // the auth then d api url
  async (thunkApi) => {
    try {
      return await colorService.getColors(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// create color
export const createColors = createAsyncThunk(
  'color/create-colors', // the auth then d api url
  async (colorData, thunkApi) => {
    try {
      return await colorService.createColor(colorData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// update color
export const updateAColor = createAsyncThunk(
  'brand/update-brand', // the auth then d api url

  async (color, thunkApi) => {
    try {
      return await colorService.updateColor(color); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//get single brand
export const getAColor = createAsyncThunk(
  'color/get-color', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await colorService.getAColor(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
//get single brand
export const deleteAColor = createAsyncThunk(
  'color/delete-color', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await colorService.deleteColor(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// reset state
export const resetState = createAction('Reset_all');
const initialState = {
  pColors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const pColorSlice = createSlice({
  name: 'pColors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pColors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colorName = action.payload.title;
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
      })
      .addCase(deleteAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pColorSlice.reducer;
