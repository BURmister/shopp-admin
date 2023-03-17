import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { delivery } from '../../types/delivers.types';

type addDelivery = {
   object: {
      deliveryName: string;
      deliveryDescription?: string | undefined;
      from: string;
      beggining: string;
      ending: string;
   };
   token: string;
};

export const addDelivery = createAsyncThunk('addDelivery', async (args: addDelivery) => {
   const { data } = await axios.post(`/api/delivers/add`, { ...args.object }, { headers: { Authorization: 'Bearer ' + args.token } });
   return data;
});

interface IAddDelivery {
   id: string;
   status: 'loading' | 'success' | 'error';
}

const initialState: IAddDelivery = {
   id: '',
   status: 'loading', // loading | success | error
};

export const addDeliverySlice = createSlice({
   name: 'addDelivery',
   initialState,
   reducers: {
      addDeliveryStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addDelivery.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(addDelivery.fulfilled, (state, action) => {
         state.id = action.payload;
         state.status = 'success';
      });
      builder.addCase(addDelivery.rejected, (state) => {
         state.status = 'error';
      });
   },
});

export const addedDelivery = (state: RootState) => state.addDelivery.id;
export const addedStatus = (state: RootState) => state.addDelivery.status;

export const { addDeliveryStatus } = addDeliverySlice.actions;

export default addDeliverySlice.reducer;
