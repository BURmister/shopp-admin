import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type editInventory = {
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
      feature: string;
   };
   token: string;
};

export const editOneInventory = createAsyncThunk('editInventory/editOneInventory', async (args: editInventory) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/inventory/edit/${args.id}`, { ...args.object });
   return data;
});

interface IOneInventory {
   inventoryId: string | null;
   editInventoryStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneInventory = {
   inventoryId: null,
   editInventoryStatus: 'loading', // loading | success | error
};

export const editInventorySlice = createSlice({
   name: 'editInventory',
   initialState,
   reducers: {
      updateEditStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.editInventoryStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(editOneInventory.pending, (state) => {
         state.editInventoryStatus = 'loading';
         state.inventoryId = null;
      });
      builder.addCase(editOneInventory.fulfilled, (state, action) => {
         state.editInventoryStatus = 'success';
         state.inventoryId = action.payload;
      });
      builder.addCase(editOneInventory.rejected, (state) => {
         state.editInventoryStatus = 'error';
         state.inventoryId = null;
      });
   },
});

//Alternative to useSelector
export const editInventoryStatus = (state: RootState) => state.editInventory.editInventoryStatus;
export const inventoryId = (state: RootState) => state.editInventory.inventoryId;

export const { updateEditStatus } = editInventorySlice.actions;

export default editInventorySlice.reducer;
