import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type deleteInventory = {
   id: string;
   token: string;
};

export const deleteOneInventory = createAsyncThunk('deleteInventory/deleteOneInventory', async (args: deleteInventory) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/inventory/delete/${args.id}`);
   return data;
});

interface IOneInventory {
   inventoryTitle: { _id: string; name: string } | null;
   deleteStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneInventory = {
   inventoryTitle: null,
   deleteStatus: 'loading', // loading | success | error
};

export const deleteInventorySlice = createSlice({
   name: 'deleteInventory',
   initialState,
   reducers: {
      updateDeleteStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.deleteStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(deleteOneInventory.pending, (state) => {
         state.deleteStatus = 'loading';
         state.inventoryTitle = null;
      });
      builder.addCase(deleteOneInventory.fulfilled, (state, action) => {
         state.deleteStatus = 'success';
         state.inventoryTitle = action.payload;
      });
      builder.addCase(deleteOneInventory.rejected, (state) => {
         state.deleteStatus = 'error';
         state.inventoryTitle = null;
      });
   },
});

//Alternative to useSelector
export const deleteStatus = (state: RootState) => state.deleteInventory.deleteStatus;
export const inventoryTitle = (state: RootState) => state.deleteInventory.inventoryTitle;

export const { updateDeleteStatus } = deleteInventorySlice.actions;

export default deleteInventorySlice.reducer;
