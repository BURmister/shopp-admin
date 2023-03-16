import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { delivery } from '../../types/delivers.types';

type args = {
   searchTerm?: string;
   token: string;
};

export const fetchDelivers = createAsyncThunk('delivers/fetchDelivers', async (args: args) => {
   const { data } = await axios.get(`/api/delivers/all${args.searchTerm ? `?searchTerm=${args.searchTerm}` : ''}`, {
      headers: { Authorization: 'Bearer ' + args.token },
   });
   return data;
});

interface IDelivers {
   delivers: delivery[];
   status: 'loading' | 'success' | 'error';
}

const initialState: IDelivers = {
   delivers: [],
   status: 'loading', // loading | success | error
};

export const deliversSlice = createSlice({
   name: 'delivers',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
      filterDelivers: (state, action: PayloadAction<string>) => {
         state.delivers = state.delivers.filter((delivery) => delivery._id !== action.payload);
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchDelivers.pending, (state) => {
         state.status = 'loading';
         state.delivers = [];
      });
      builder.addCase(fetchDelivers.fulfilled, (state, action) => {
         state.status = 'success';
         state.delivers = action.payload;
      });
      builder.addCase(fetchDelivers.rejected, (state) => {
         state.status = 'error';
         state.delivers = [];
      });
   },
});

//Alternative to useSelector
export const getDelivers = (state: RootState) => state.delivers.delivers;
export const deliversStatus = (state: RootState) => state.delivers.status;

export const { updateStatus } = deliversSlice.actions;
export const { filterDelivers } = deliversSlice.actions;

export default deliversSlice.reducer;
