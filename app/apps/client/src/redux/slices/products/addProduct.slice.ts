import { urlAPI } from '../../../api/api.constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { product } from '../../types/product.types';

type addProduct = {
   object: {
      name: string;
      price: string;
      description: string;
      gender: 'Мужской' | 'Женский';
      category: string;
      producer: string;
      size: string;
      amount: number;
   };
   token: string;
};

export const addProduct = createAsyncThunk('addProduct', async (args: addProduct) => {
   const { data } = await axios.post(
      `/api/products/add`,
      { ...args.object },
      { headers: { Authorization: 'Bearer ' + args.token } },
   );
   return data;
});

interface IAddProduct {
   id: string | null;
   status: 'loading' | 'success' | 'error';
}

const initialState: IAddProduct = {
   id: null,
   status: 'loading', // loading | success | error
};

export const addProductSlice = createSlice({
   name: 'addProduct',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(addProduct.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(addProduct.fulfilled, (state, action) => {
         state.id = action.payload;
         state.status = 'success';
      });
      builder.addCase(addProduct.rejected, (state) => {
         state.status = 'error';
         state.id = null;
      });
   },
});

export const addedProduct = (state: RootState) => state.addProduct.id;
export const addedStatus = (state: RootState) => state.addProduct.status;

export default addProductSlice.reducer;
