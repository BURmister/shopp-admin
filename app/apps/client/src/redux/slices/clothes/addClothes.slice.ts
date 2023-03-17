import { urlAPI } from '../../../api/api.constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { clothes } from '../../types/clothes.types';

type addClothes = {
   object: {
      name: string;
      price: string;
      description: string;
      gender: 'Мужской' | 'Женский';
      category: string;
      producer: string;
      size: string;
      amount: number;
   };
   token: string;
};

export const addClothes = createAsyncThunk('addClothes', async (args: addClothes) => {
   const { data } = await axios.post(`/api/clothes/add`, { ...args.object }, { headers: { Authorization: 'Bearer ' + args.token } });
   return data;
});

interface IAddClothes {
   id: string | null;
   status: 'loading' | 'success' | 'error';
}

const initialState: IAddClothes = {
   id: null,
   status: 'loading', // loading | success | error
};

export const addClothesSlice = createSlice({
   name: 'addClothes',
   initialState,
   reducers: {
      updateAddStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addClothes.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(addClothes.fulfilled, (state, action) => {
         state.id = action.payload;
         state.status = 'success';
      });
      builder.addCase(addClothes.rejected, (state) => {
         state.status = 'error';
         state.id = null;
      });
   },
});

export const addedClothes = (state: RootState) => state.addClothes.id;
export const addedStatus = (state: RootState) => state.addClothes.status;

export const { updateAddStatus } = addClothesSlice.actions;

export default addClothesSlice.reducer;
