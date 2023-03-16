import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type deleteDelivery = {
   id: string;
   token: string;
};

export const deleteOneDelivery = createAsyncThunk('deleteDelivery/deleteOneDelivery', async (args: deleteDelivery) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/delivers/delete/${args.id}`);
   return data;
});

interface IOneDelivery {
   productTitle: { _id: string; name: string } | null;
   deleteStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneDelivery = {
   productTitle: null,
   deleteStatus: 'loading', // loading | success | error
};

export const deleteDeliverySlice = createSlice({
   name: 'deleteDelivery',
   initialState,
   reducers: {
      updateDeleteStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.deleteStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(deleteOneDelivery.pending, (state) => {
         state.deleteStatus = 'loading';
         state.productTitle = null;
      });
      builder.addCase(deleteOneDelivery.fulfilled, (state, action) => {
         state.deleteStatus = 'success';
         state.productTitle = action.payload;
      });
      builder.addCase(deleteOneDelivery.rejected, (state) => {
         state.deleteStatus = 'error';
         state.productTitle = null;
      });
   },
});

//Alternative to useSelector
export const deleteStatus = (state: RootState) => state.deleteDelivery.deleteStatus;
export const productTitle = (state: RootState) => state.deleteDelivery.productTitle;

export const { updateDeleteStatus } = deleteDeliverySlice.actions;

export default deleteDeliverySlice.reducer;
