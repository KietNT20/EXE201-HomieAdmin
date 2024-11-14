import { authService } from '@/services/authService';
import tokenMethod from '@/util/token';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from './types.action';

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
