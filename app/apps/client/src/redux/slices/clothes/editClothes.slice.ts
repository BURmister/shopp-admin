import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type editClothes = {
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
   };
   token: string;
};

export const editOneClothes = createAsyncThunk('editClothes/editOneClothes', async (args: editClothes) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/clothes/edit/${args.id}`, { ...args.object });
   return data;
});

interface IOneClothes {
   clothesId: string | null;
   editClothesStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneClothes = {
   clothesId: null,
   editClothesStatus: 'loading', // loading | success | error
};

export const editClothesSlice = createSlice({
   name: 'editClothes',
   initialState,
   reducers: {
      updateEditStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.editClothesStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(editOneClothes.pending, (state) => {
         state.editClothesStatus = 'loading';
         state.clothesId = null;
      });
      builder.addCase(editOneClothes.fulfilled, (state, action) => {
         state.editClothesStatus = 'success';
         state.clothesId = action.payload;
      });
      builder.addCase(editOneClothes.rejected, (state) => {
         state.editClothesStatus = 'error';
         state.clothesId = null;
      });
   },
});

//Alternative to useSelector
export const editClothesStatus = (state: RootState) => state.editClothes.editClothesStatus;
export const clothesId = (state: RootState) => state.editClothes.clothesId;

export const { updateEditStatus } = editClothesSlice.actions;

export default editClothesSlice.reducer;
