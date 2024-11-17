import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleSaveUserDetail } from '../actions/profile/profile.thunks';
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
      .addCase(handleSaveUserDetail.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.userLoading = false;
      })
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
