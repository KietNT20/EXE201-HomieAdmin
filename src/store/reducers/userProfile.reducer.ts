import { authService } from '@/services/authService';
import tokenMethod from '@/util/token';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, UserProfileState } from '../actions/profile/types.action';

const initialState: UserProfileState = {
  userProfile: {},
  userLoading: false
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    saveUserProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
    },
    clearUserProfile(state) {
      state.userProfile = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSaveUserDetail.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(
        handleSaveUserDetail.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.userProfile = action.payload;
          state.userLoading = false;
        }
      )
      .addCase(handleSaveUserDetail.rejected, (state) => {
        state.userLoading = false;
      });
  }
});

// Extract the action creators object and the reducer
const { actions, reducer: profileReducer } = userProfileSlice;
// Extract and export each action creator by name
export const { saveUserProfile, clearUserProfile } = actions;
// Export the reducer, either as a default or named export
export default profileReducer;

export const handleSaveUserDetail = createAsyncThunk(
  'userProfile/saveUserProfile',
  async (_, thunkApi) => {
    try {
      // Lấy token đã lưu
      const token = tokenMethod.get()?.token;
      if (!token) return thunkApi.rejectWithValue('No token');
      const response = await authService.getUserByToken(token);
      return response.data as UserProfile;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
