import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { user } from '../../types/users.types';

type args = {
   id: string;
   token: string;
};

export const fetchOneUser = createAsyncThunk('oneUser/fetchOneUser', async (args: args) => {
   const { data } = await axios.get(`/api/users/${args.id}`, { headers: { Authorization: 'Bearer ' + args.token } });
   return data;
});

interface IOneUser {
   oneUser: user | null;
   status: 'loading' | 'success' | 'error';
}

const initialState: IOneUser = {
   oneUser: null,
   status: 'loading', // loading | success | error
};

export const oneUserSlice = createSlice({
   name: 'oneUser',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchOneUser.pending, (state) => {
         state.status = 'loading';
         state.oneUser = null;
      });
      builder.addCase(fetchOneUser.fulfilled, (state, action) => {
         state.status = 'success';
         state.oneUser = action.payload;
      });
      builder.addCase(fetchOneUser.rejected, (state) => {
         state.status = 'error';
         state.oneUser = null;
      });
   },
});

//Alternative to useSelector
export const getOneUser = (state: RootState) => state.oneUser.oneUser;
export const userStatus = (state: RootState) => state.oneUser.status;

export const { updateStatus } = oneUserSlice.actions;

export default oneUserSlice.reducer;
