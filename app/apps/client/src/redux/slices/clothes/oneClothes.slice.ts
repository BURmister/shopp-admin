import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { clothes } from '../../types/clothes.types';

type args = {
   id: string;
   token: string;
};

export const fetchOneClothes = createAsyncThunk('oneClothes/fetchOneClothes', async (args: args) => {
   const { data } = await axios.get(`/api/clothes/${args.id}`, { headers: { Authorization: 'Bearer ' + args.token } });
   return data;
});

interface IOneClothes {
   oneClothes: clothes | null;
   status: 'loading' | 'success' | 'error';
}

const initialState: IOneClothes = {
   oneClothes: null,
   status: 'loading', // loading | success | error
};

export const oneClothesSlice = createSlice({
   name: 'oneClothes',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchOneClothes.pending, (state) => {
         state.status = 'loading';
         state.oneClothes = null;
      });
      builder.addCase(fetchOneClothes.fulfilled, (state, action) => {
         state.status = 'success';
         state.oneClothes = action.payload;
      });
      builder.addCase(fetchOneClothes.rejected, (state) => {
         state.status = 'error';
         state.oneClothes = null;
      });
   },
});

//Alternative to useSelector
export const getOneClothes = (state: RootState) => state.oneClothes.oneClothes;
export const clothesStatus = (state: RootState) => state.oneClothes.status;

export const { updateStatus } = oneClothesSlice.actions;

export default oneClothesSlice.reducer;
