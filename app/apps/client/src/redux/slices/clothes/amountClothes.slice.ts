import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type amountClothes = {
   _id: string;
   state: 'plus' | 'minus';
   token: string;
};

export const amountClothes = createAsyncThunk('amountClothes/amountClothes', async (args: amountClothes) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   if (args.state === 'plus') {
      const { data } = await instance.put(`/api/clothes/plus/${args._id}`);
      return data;
   } else {
      const { data } = await instance.put(`/api/clothes/minus/${args._id}`);
      return data;
   }
});

interface IOneClothes {
   clothesTitle: {_id: string, name: string} | null;
   amountStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneClothes = {
   clothesTitle: null,
   amountStatus: 'loading', // loading | success | error
};

export const amountClothesSlice = createSlice({
   name: 'amountClothes',
   initialState,
   reducers: {
      updateAmountStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.amountStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(amountClothes.pending, (state) => {
         state.amountStatus = 'loading';
         state.clothesTitle = null;
      });
      builder.addCase(amountClothes.fulfilled, (state, action) => {
         state.amountStatus = 'success';
         state.clothesTitle = action.payload;
      });
      builder.addCase(amountClothes.rejected, (state) => {
         state.amountStatus = 'error';
         state.clothesTitle = null;
      });
   },
});

//Alternative to useSelector
export const amountStatus = (state: RootState) => state.amountClothes.amountStatus;
export const clothesTitle = (state: RootState) => state.amountClothes.clothesTitle;

export const { updateAmountStatus } = amountClothesSlice.actions;

export default amountClothesSlice.reducer;
