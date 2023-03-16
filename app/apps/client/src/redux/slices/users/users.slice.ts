import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { user } from '../../types/users.types';

type args = {
   searchTerm?: string;
   token: string;
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (args: args) => {
   const { data } = await axios.get(`/api/users/all${args.searchTerm ? `?searchTerm=${args.searchTerm}` : ''}`, {
      headers: { Authorization: 'Bearer ' + args.token },
   });
   return data;
});

interface IUsers {
   users: user[];
   status: 'loading' | 'success' | 'error';
}

const initialState: IUsers = {
   users: [],
   status: 'loading', // loading | success | error
};

export const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
      filterUsers: (state, action: PayloadAction<string>) => {
         state.users = state.users.filter((user) => user._id !== action.payload);
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchUsers.pending, (state) => {
         state.status = 'loading';
         state.users = [];
      });
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
         state.status = 'success';
         state.users = action.payload;
      });
      builder.addCase(fetchUsers.rejected, (state) => {
         state.status = 'error';
         state.users = [];
      });
   },
});

//Alternative to useSelector
export const getUsers = (state: RootState) => state.users.users;
export const usersStatus = (state: RootState) => state.users.status;

export const { updateStatus } = usersSlice.actions;
export const { filterUsers } = usersSlice.actions;

export default usersSlice.reducer;
