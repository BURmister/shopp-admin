import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type amountInventory = {
   _id: string;
   state: 'plus' | 'minus';
   token: string;
};

export const amountInventory = createAsyncThunk('amountInventory/amountInventory', async (args: amountInventory) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   if (args.state === 'plus') {
      const { data } = await instance.put(`/api/inventory/plus/${args._id}`);
      return data;
   } else {
      const { data } = await instance.put(`/api/inventory/minus/${args._id}`);
      return data;
   }
});

interface IOneInventory {
   inventoryTitle: {_id: string, name: string} | null;
   amountStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneInventory = {
   inventoryTitle: null,
   amountStatus: 'loading', // loading | success | error
};

export const amountInventorySlice = createSlice({
   name: 'amountInventory',
   initialState,
   reducers: {
      updateAmountStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.amountStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(amountInventory.pending, (state) => {
         state.amountStatus = 'loading';
         state.inventoryTitle = null;
      });
      builder.addCase(amountInventory.fulfilled, (state, action) => {
         state.amountStatus = 'success';
         state.inventoryTitle = action.payload;
      });
      builder.addCase(amountInventory.rejected, (state) => {
         state.amountStatus = 'error';
         state.inventoryTitle = null;
      });
   },
});

//Alternative to useSelector
export const amountStatus = (state: RootState) => state.amountInventory.amountStatus;
export const inventoryTitle = (state: RootState) => state.amountInventory.inventoryTitle;

export const { updateAmountStatus } = amountInventorySlice.actions;

export default amountInventorySlice.reducer;
