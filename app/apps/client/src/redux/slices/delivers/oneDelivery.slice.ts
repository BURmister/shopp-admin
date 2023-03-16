import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { delivery } from '../../types/delivers.types';

type args = {
   id: string;
   token: string;
};

export const fetchOneDelivery = createAsyncThunk('oneDelivery/fetchOneDelivery', async (args: args) => {
   const { data } = await axios.get(`/api/delivers/${args.id}`, { headers: { Authorization: 'Bearer ' + args.token } });
   return data;
});

interface IOneDelivery {
   oneDelivery: delivery | null;
   status: 'loading' | 'success' | 'error';
}

const initialState: IOneDelivery = {
   oneDelivery: null,
   status: 'loading', // loading | success | error
};

export const oneDeliverySlice = createSlice({
   name: 'oneDelivery',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchOneDelivery.pending, (state) => {
         state.status = 'loading';
         state.oneDelivery = null;
      });
      builder.addCase(fetchOneDelivery.fulfilled, (state, action) => {
         state.status = 'success';
         state.oneDelivery = action.payload;
      });
      builder.addCase(fetchOneDelivery.rejected, (state) => {
         state.status = 'error';
         state.oneDelivery = null;
      });
   },
});

//Alternative to useSelector
export const getOneDelivery = (state: RootState) => state.oneDelivery.oneDelivery;
export const deliveryStatus = (state: RootState) => state.oneDelivery.status;

export const { updateStatus } = oneDeliverySlice.actions;

export default oneDeliverySlice.reducer;
