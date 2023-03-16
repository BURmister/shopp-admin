import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { product } from '../../types/product.types';

type args = {
   searchTerm?: string;
   token: string;
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (args: args) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.get(`/api/products/all${args.searchTerm ? `?searchTerm=${args.searchTerm}` : ''}`);
   return data;
});

interface IProducts {
   products: product[];
   status: 'loading' | 'success' | 'error';
}

const initialState: IProducts = {
   products: [],
   status: 'loading', // loading | success | error
};

export const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
      filterProducts: (state, action: PayloadAction<string>) => {
         state.products = state.products.filter((product) => product._id !== action.payload);
      },
      // changeAmount: (state, action: PayloadAction<{ _id: string; state: 'plus' | 'minus' }>) => {
      //    const product = state.products.find((product) => product._id === action.payload._id);
      //    if (product !== undefined) {
      //       product.amount + 1;
      //       state.products = state.products.map((item) => (item._id !== product._id ? item : product));
      //    }
      // },
      changeAmount: (state, action: PayloadAction<{ _id: string; state: 'plus' | 'minus' }>) => {
         const product = state.products.find((item) => (item._id = action.payload._id));
         const string = action.payload.state;
         if (product) {
            if (string === 'plus') {
               product.amount = product.amount + 1;
            } else {
               product.amount = product.amount - 1;
            }
            const index = state.products.findIndex((item) => item === product);
            state.products[index] = product;
         }
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
         state.status = 'loading';
         state.products = [];
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.status = 'success';
         state.products = action.payload;
      });
      builder.addCase(fetchProducts.rejected, (state) => {
         state.status = 'error';
         state.products = [];
      });
   },
});

//Alternative to useSelector
export const getProducts = (state: RootState) => state.products.products;
export const productsStatus = (state: RootState) => state.products.status;

export const { updateStatus } = productsSlice.actions;
export const { filterProducts } = productsSlice.actions;
export const { changeAmount } = productsSlice.actions;

export default productsSlice.reducer;
