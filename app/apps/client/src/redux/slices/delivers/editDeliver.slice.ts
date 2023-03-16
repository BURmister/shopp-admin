import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type editDelivery = {
   id: string;
   object: {
      deliveryName?: string;
      deliveryDescription?: string | undefined;
      from?: string;
      beggining?: string;
      ending?: string;
   };
   token: string;
};

export const editOnDelivery = createAsyncThunk('editDelivery/editOnDelivery', async (args: editDelivery) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/delivers/edit/${args.id}`, { ...args.object });
   return data;
});

interface IOneDelivery {
   deliveryCode: string | null;
   editDStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneDelivery = {
   deliveryCode: null,
   editDStatus: 'loading', // loading | success | error
};

export const editDeliverySlice = createSlice({
   name: 'editDelivery',
   initialState,
   reducers: {
      editDeliveryStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.editDStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(editOnDelivery.pending, (state) => {
         state.editDStatus = 'loading';
         state.deliveryCode = null;
      });
      builder.addCase(editOnDelivery.fulfilled, (state, action) => {
         state.editDStatus = 'success';
         state.deliveryCode = action.payload;
      });
      builder.addCase(editOnDelivery.rejected, (state) => {
         state.editDStatus = 'error';
         state.deliveryCode = null;
      });
   },
});

//Alternative to useSelector
export const editDStatus = (state: RootState) => state.editDelivery.editDStatus;
export const deliveryCode = (state: RootState) => state.editDelivery.deliveryCode;

export const { editDeliveryStatus } = editDeliverySlice.actions;

export default editDeliverySlice.reducer;
