import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type editUser = {
   id: string
   object: {
      role: string;
      firstName: string;
      secondName: string;
   };
   token: string;
};

export const editOnUser = createAsyncThunk('editUser/editOnUser', async (args: editUser) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/users/update/${args.id}`, { ...args.object });
   return data;
});

interface IOneUser {
   userId: string | null;
   editUserStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneUser = {
   userId: null,
   editUserStatus: 'loading', // loading | success | error
};

export const editUserSlice = createSlice({
   name: 'editUser',
   initialState,
   reducers: {
      updateDeleteStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.editUserStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(editOnUser.pending, (state) => {
         state.editUserStatus = 'loading';
         state.userId = null;
      });
      builder.addCase(editOnUser.fulfilled, (state, action) => {
         state.editUserStatus = 'success';
         state.userId = action.payload;
      });
      builder.addCase(editOnUser.rejected, (state) => {
         state.editUserStatus = 'error';
         state.userId = null;
      });
   },
});

//Alternative to useSelector
export const editUserStatus = (state: RootState) => state.editUser.editUserStatus;
export const userId = (state: RootState) => state.editUser.userId;

export const { updateDeleteStatus } = editUserSlice.actions;

export default editUserSlice.reducer;
