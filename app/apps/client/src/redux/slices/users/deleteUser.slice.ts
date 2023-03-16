import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type deleteUser = {
   id: string;
   token: string;
};

export const deleteOneUser = createAsyncThunk('deleteUser/deleteOneUser', async (args: deleteUser) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/delivers/delete/${args.id}`);
   return data;
});

interface IOneUser {
   productTitle: { _id: string; name: string } | null;
   deleteStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneUser = {
   productTitle: null,
   deleteStatus: 'loading', // loading | success | error
};

export const deleteUserSlice = createSlice({
   name: 'deleteUser',
   initialState,
   reducers: {
      updateDeleteStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.deleteStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(deleteOneUser.pending, (state) => {
         state.deleteStatus = 'loading';
         state.productTitle = null;
      });
      builder.addCase(deleteOneUser.fulfilled, (state, action) => {
         state.deleteStatus = 'success';
         state.productTitle = action.payload;
      });
      builder.addCase(deleteOneUser.rejected, (state) => {
         state.deleteStatus = 'error';
         state.productTitle = null;
      });
   },
});

//Alternative to useSelector
export const deleteStatus = (state: RootState) => state.deleteUser.deleteStatus;
export const productTitle = (state: RootState) => state.deleteUser.productTitle;

export const { updateDeleteStatus } = deleteUserSlice.actions;

export default deleteUserSlice.reducer;
