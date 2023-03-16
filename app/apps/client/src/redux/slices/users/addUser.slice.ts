import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { user } from '../../types/users.types';

type addUser = {
   object: {
      name: string;
      password: string;
      role: string;
      firstName: string;
      secondName: string;
   };
   token: string;
};

export const addUser = createAsyncThunk('addUser', async (args: addUser) => {
   const { data } = await axios.post(
      `/api/auth/register`,
      { ...args.object },
      { headers: { Authorization: 'Bearer ' + args.token } }
   );
   return data;
});

interface IAddUser {
   id: string;
   status: 'loading' | 'success' | 'error';
}

const initialState: IAddUser = {
   id: '',
   status: 'loading', // loading | success | error
};

export const addUserSlice = createSlice({
   name: 'addUser',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(addUser.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(addUser.fulfilled, (state, action) => {
         state.id = action.payload;
         state.status = 'success';
      });
      builder.addCase(addUser.rejected, (state) => {
         state.status = 'error';
      });
   },
});

export const addStatus = (state: RootState) => state.addUser.status;

export const addedUser = (state: RootState) => state.addProduct.id;
export const addedStatus = (state: RootState) => state.addProduct.status;

export default addUserSlice.reducer;
