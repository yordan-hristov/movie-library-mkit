import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../services/userService';

export const getUserFavorites = createAsyncThunk(
  'users/getUserFavorites',
  async (userId: string) => {
    const favorites = await userService.getUserFavorites(userId)
    return favorites;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
      user: {}
  },
  reducers: {
    setUser: (state,action) => {
      state.user = action.payload
    },
    removeUser: (state) => {
      state.user = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserFavorites.fulfilled, (state,action) => {
      state.user = {...state.user,favorites: action.payload}
    })
  }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;