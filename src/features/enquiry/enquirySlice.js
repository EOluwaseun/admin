import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import enquiryService from './enquiryService';

export const getEnquiries = createAsyncThunk(
  'enquiry/get-enquiry', // the auth then d api url
  async (thunkApi) => {
    try {
      return await enquiryService.getEnquiries(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getAEnquiry = createAsyncThunk(
  'enquiry/geta-enquiry', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await enquiryService.getEnquiry(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateAEnquiry = createAsyncThunk(
  'enquiry/update-enquiry', // the auth then d api url

  async (enqData, thunkApi) => {
    try {
      return await enquiryService.updateEnquiry(enqData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteAEnquiry = createAsyncThunk(
  'enquiry/delete-enquiry', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await enquiryService.deleteEnquiry(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enqName = action.payload.name;
        state.enqEmail = action.payload.email;
        state.enqMobile = action.payload.mobile;
        state.enqComment = action.payload.comment;
        state.enqStatus = action.payload.status;
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
