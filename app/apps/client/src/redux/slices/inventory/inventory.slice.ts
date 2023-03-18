import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { inventory } from '../../types/inventory.types';

type args = {
   searchTerm?: string;
   token: string;
};

export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async (args: args) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.get(`/api/inventory/all${args.searchTerm ? `?searchTerm=${args.searchTerm}` : ''}`);
   return data;
});

interface IInventory {
   inventory: inventory[];
   status: 'loading' | 'success' | 'error';
}

const initialState: IInventory = {
   inventory: [],
   status: 'loading', // loading | success | error
};

export const inventorySlice = createSlice({
   name: 'inventory',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
      filterInventory: (state, action: PayloadAction<string>) => {
         state.inventory = state.inventory.filter((inventory) => inventory._id !== action.payload);
      },
      // changeAmount: (state, action: PayloadAction<{ _id: string; state: 'plus' | 'minus' }>) => {
      //    const inventory = state.inventory.find((inventory) => inventory._id === action.payload._id);
      //    if (inventory !== undefined) {
      //       inventory.amount + 1;
      //       state.inventory = state.inventory.map((item) => (item._id !== inventory._id ? item : inventory));
      //    }
      // },
      changeAmount: (state, action: PayloadAction<{ _id: string; state: 'plus' | 'minus' }>) => {
         // const inventory = state.inventory.find((item) => (item._id = action.payload._id));
         // const string = action.payload.state;
         // if (inventory) {
         //    if (string === 'plus') {
         //       inventory.amount = inventory.amount + 1;
         //    } else {
         //       inventory.amount = inventory.amount - 1;
         //    }
         //    const index = state.inventory.findIndex((item) => item === inventory);
         //    state.inventory[index] = inventory;
         // }
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchInventory.pending, (state) => {
         state.status = 'loading';
         state.inventory = [];
      });
      builder.addCase(fetchInventory.fulfilled, (state, action) => {
         state.status = 'success';
         state.inventory = action.payload;
      });
      builder.addCase(fetchInventory.rejected, (state) => {
         state.status = 'error';
         state.inventory = [];
      });
   },
});

//Alternative to useSelector
export const getInventory = (state: RootState) => state.inventory.inventory;
export const inventoryStatus = (state: RootState) => state.inventory.status;

export const { updateStatus } = inventorySlice.actions;
export const { filterInventory } = inventorySlice.actions;
export const { changeAmount } = inventorySlice.actions;

export default inventorySlice.reducer;
