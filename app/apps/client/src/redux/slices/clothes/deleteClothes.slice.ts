import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type deleteClothes = {
   id: string;
   token: string;
};

export const deleteOneClothes = createAsyncThunk('deleteClothes/deleteOneClothes', async (args: deleteClothes) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/clothes/delete/${args.id}`);
   return data;
});

interface IOneClothes {
   clothesTitle: { _id: string; name: string } | null;
   deleteStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneClothes = {
   clothesTitle: null,
   deleteStatus: 'loading', // loading | success | error
};

export const deleteClothesSlice = createSlice({
   name: 'deleteClothes',
   initialState,
   reducers: {
      updateDeleteStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.deleteStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(deleteOneClothes.pending, (state) => {
         state.deleteStatus = 'loading';
         state.clothesTitle = null;
      });
      builder.addCase(deleteOneClothes.fulfilled, (state, action) => {
         state.deleteStatus = 'success';
         state.clothesTitle = action.payload;
      });
      builder.addCase(deleteOneClothes.rejected, (state) => {
         state.deleteStatus = 'error';
         state.clothesTitle = null;
      });
   },
});

//Alternative to useSelector
export const deleteStatus = (state: RootState) => state.deleteClothes.deleteStatus;
export const clothesTitle = (state: RootState) => state.deleteClothes.clothesTitle;

export const { updateDeleteStatus } = deleteClothesSlice.actions;

export default deleteClothesSlice.reducer;
