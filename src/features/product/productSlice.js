import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from './productService';

export const getProducts = createAsyncThunk(
  'product/get-products', // the auth then d api url
  async (thunkApi) => {
    try {
      return await productService.getProducts(); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// create product
export const createProducts = createAsyncThunk(
  'product/create-products', // the auth then d api url
  async (productData, thunkApi) => {
    try {
      return await productService.createProduct(productData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  'product/get-product', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await productService.getProduct(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateAProduct = createAsyncThunk(
  'product/update-product', // the auth then d api url

  async (productData, thunkApi) => {
    try {
      return await productService.updateBlog(productData); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteAProduct = createAsyncThunk(
  'product/delete-product', // the auth then d api url
  async (id, thunkApi) => {
    try {
      return await productService.deleteProduct(id); // call it
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// reset state
export const resetState = createAction('Reset_all');
const initialState = {
  products: [],
  // createdProduct: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })

      
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.prodName = action.payload.title;
        state.prodDesc = action.payload.description;
        state.prodCategory = action.payload.category;
        state.prodImages = action.payload.images;
        state.prodPrice = action.payload.price;
        state.prodBrand = action.payload.brand;
        state.prodTags = action.payload.tags;
        state.prodColor = action.payload.color;
        state.prodQuantity = action.payload.quantity;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
      })
      .addCase(deleteAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
