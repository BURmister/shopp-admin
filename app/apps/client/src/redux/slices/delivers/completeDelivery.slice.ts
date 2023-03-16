import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type completeDelivery = {
   id: string;
   token: string;
};

export const completeOneDelivery = createAsyncThunk('completeDelivery/completeOneDelivery', async (args: completeDelivery) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/delivers/complete/${args.id}`);
   return data;
});

interface IOneDelivery {
   productTitle: { _id: string; name: string } | null;
   completeStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneDelivery = {
   productTitle: null,
   completeStatus: 'loading', // loading | success | error
};

export const completeDeliverySlice = createSlice({
   name: 'completeDelivery',
   initialState,
   reducers: {
      updateDeleteStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.completeStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(completeOneDelivery.pending, (state) => {
         state.completeStatus = 'loading';
         state.productTitle = null;
      });
      builder.addCase(completeOneDelivery.fulfilled, (state, action) => {
         state.completeStatus = 'success';
         state.productTitle = action.payload;
      });
      builder.addCase(completeOneDelivery.rejected, (state) => {
         state.completeStatus = 'error';
         state.productTitle = null;
      });
   },
});

//Alternative to useSelector
export const completeStatus = (state: RootState) => state.completeDelivery.completeStatus;
export const productTitle = (state: RootState) => state.completeDelivery.productTitle;

export const { updateDeleteStatus } = completeDeliverySlice.actions;

export default completeDeliverySlice.reducer;
