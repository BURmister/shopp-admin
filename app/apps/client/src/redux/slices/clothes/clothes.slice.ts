import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { clothes } from '../../types/clothes.types';

type args = {
   searchTerm?: string;
   token: string;
};

export const fetchClothes = createAsyncThunk('clothes/fetchClothes', async (args: args) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.get(`/api/clothes/all${args.searchTerm ? `?searchTerm=${args.searchTerm}` : ''}`);
   return data;
});

interface IClothes {
   clothes: clothes[];
   status: 'loading' | 'success' | 'error';
}

const initialState: IClothes = {
   clothes: [],
   status: 'loading', // loading | success | error
};

export const clothesSlice = createSlice({
   name: 'clothes',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
      filterClothes: (state, action: PayloadAction<string>) => {
         state.clothes = state.clothes.filter((clothes) => clothes._id !== action.payload);
      },
      // changeAmount: (state, action: PayloadAction<{ _id: string; state: 'plus' | 'minus' }>) => {
      //    const clothes = state.clothes.find((clothes) => clothes._id === action.payload._id);
      //    if (clothes !== undefined) {
      //       clothes.amount + 1;
      //       state.clothes = state.clothes.map((item) => (item._id !== clothes._id ? item : clothes));
      //    }
      // },
      changeAmount: (state, action: PayloadAction<{ _id: string; state: 'plus' | 'minus' }>) => {
         const clothes = state.clothes.find((item) => (item._id = action.payload._id));
         const string = action.payload.state;
         if (clothes) {
            if (string === 'plus') {
               clothes.amount = clothes.amount + 1;
            } else {
               clothes.amount = clothes.amount - 1;
            }
            const index = state.clothes.findIndex((item) => item === clothes);
            state.clothes[index] = clothes;
         }
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchClothes.pending, (state) => {
         state.status = 'loading';
         state.clothes = [];
      });
      builder.addCase(fetchClothes.fulfilled, (state, action) => {
         state.status = 'success';
         state.clothes = action.payload;
      });
      builder.addCase(fetchClothes.rejected, (state) => {
         state.status = 'error';
         state.clothes = [];
      });
   },
});

//Alternative to useSelector
export const getClothes = (state: RootState) => state.clothes.clothes;
export const clothesStatus = (state: RootState) => state.clothes.status;

export const { updateStatus } = clothesSlice.actions;
export const { filterClothes } = clothesSlice.actions;
export const { changeAmount } = clothesSlice.actions;

export default clothesSlice.reducer;
