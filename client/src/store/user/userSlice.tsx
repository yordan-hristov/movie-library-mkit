import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../services/userService';

export const getUserFavorites = createAsyncThunk(
  'users/getUserFavorites',
  async (userId: string) => {
    const favorites = await userService.getUserFavorites(userId)
    return favorites;
  }
)

export const getUserRatings = createAsyncThunk(
  'users/getUserRatings',
  async (userId: string) => {
    const ratings = await userService.getUserRatings(userId);
    return ratings;
  }
)

export const getUserNotes = createAsyncThunk(
  'users/getUserNotes',
  async (userId: string) => {
    const notes = await userService.getUserNotes(userId);
    return notes;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    removeUser: (state) => {
      state.user = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFavorites.fulfilled, (state, action) => {
        state.user = { ...state.user, favorites: action.payload }
      })
      .addCase(getUserRatings.fulfilled, (state, action) => {
        state.user = { ...state.user, ratings: action.payload }
      })
      .addCase(getUserNotes.fulfilled, (state, action) => {
        state.user = { ...state.user, notes: action.payload }
      })
  }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;