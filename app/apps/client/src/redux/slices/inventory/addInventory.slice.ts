import { urlAPI } from '../../../api/api.constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { inventory } from '../../types/inventory.types';

type addInventory = {
   object: {
      name: string;
      price: string;
      description: string;
      gender: 'Мужской' | 'Женский';
      category: string;
      producer: string;
      size: string;
      amount: number;
      feature: string;
   };
   token: string;
};

export const addInventory = createAsyncThunk('addInventory', async (args: addInventory) => {
   const { data } = await axios.post(`/api/inventory/add`, { ...args.object }, { headers: { Authorization: 'Bearer ' + args.token } });
   return data;
});

interface IAddInventory {
   id: string | null;
   status: 'loading' | 'success' | 'error';
}

const initialState: IAddInventory = {
   id: null,
   status: 'loading', // loading | success | error
};

export const addInventorySlice = createSlice({
   name: 'addInventory',
   initialState,
   reducers: {
      updateAddStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addInventory.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(addInventory.fulfilled, (state, action) => {
         state.id = action.payload;
         state.status = 'success';
      });
      builder.addCase(addInventory.rejected, (state) => {
         state.status = 'error';
         state.id = null;
      });
   },
});

export const addedInventory = (state: RootState) => state.addInventory.id;
export const addedStatus = (state: RootState) => state.addInventory.status;

export const { updateAddStatus } = addInventorySlice.actions;

export default addInventorySlice.reducer;
