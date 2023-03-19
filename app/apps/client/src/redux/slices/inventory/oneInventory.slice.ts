import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { inventory } from '../../types/inventory.types';

type args = {
   id: string;
   token: string;
};

export const fetchOneInventory = createAsyncThunk('oneInventory/fetchOneInventory', async (args: args) => {
   const { data } = await axios.get(`/api/inventory/${args.id}`, { headers: { Authorization: 'Bearer ' + args.token } });
   return data;
});

interface IOneInventory {
   oneInventory: inventory | null;
   status: 'loading' | 'success' | 'error';
}

const initialState: IOneInventory = {
   oneInventory: null,
   status: 'loading', // loading | success | error
};

export const oneInventorySlice = createSlice({
   name: 'oneInventory',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchOneInventory.pending, (state) => {
         state.status = 'loading';
         state.oneInventory = null;
      });
      builder.addCase(fetchOneInventory.fulfilled, (state, action) => {
         state.status = 'success';
         state.oneInventory = action.payload;
      });
      builder.addCase(fetchOneInventory.rejected, (state) => {
         state.status = 'error';
         state.oneInventory = null;
      });
   },
});

//Alternative to useSelector
export const getOneInventory = (state: RootState) => state.oneInventory.oneInventory;
export const inventoryStatus = (state: RootState) => state.oneInventory.status;

export const { updateStatus } = oneInventorySlice.actions;

export default oneInventorySlice.reducer;
