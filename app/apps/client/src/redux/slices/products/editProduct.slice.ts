import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type editProduct = {
   id: string;
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

export const editOneProduct = createAsyncThunk('editProduct/editOneProduct', async (args: editProduct) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/products/edit/${args.id}`, { ...args.object });
   return data;
});

interface IOneProduct {
   productId: string | null;
   editProductStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneProduct = {
   productId: null,
   editProductStatus: 'loading', // loading | success | error
};

export const editProductSlice = createSlice({
   name: 'editProduct',
   initialState,
   reducers: {
      updateEditStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.editProductStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(editOneProduct.pending, (state) => {
         state.editProductStatus = 'loading';
         state.productId = null;
      });
      builder.addCase(editOneProduct.fulfilled, (state, action) => {
         state.editProductStatus = 'success';
         state.productId = action.payload;
      });
      builder.addCase(editOneProduct.rejected, (state) => {
         state.editProductStatus = 'error';
         state.productId = null;
      });
   },
});

//Alternative to useSelector
export const editProductStatus = (state: RootState) => state.editProduct.editProductStatus;
export const productId = (state: RootState) => state.editProduct.productId;

export const { updateEditStatus } = editProductSlice.actions;

export default editProductSlice.reducer;
