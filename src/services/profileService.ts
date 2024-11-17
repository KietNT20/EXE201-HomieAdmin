import { API } from '@/api/apiUrl';
import { Profile } from '@/types/types.common';
import axiosInstance from '@/util/axiosInstance';

export const profileService = {
  getProfiles(userId: number) {
    return axiosInstance.get(API.PROFILES_API.GET_PROFILES + userId);
  },
  updateProfiles(payload: Profile, profileID: number) {
    return axiosInstance.put(API.PROFILES_API.UPDATE + profileID, payload);
  },
  createProfiles(payload: Profile) {
    return axiosInstance.post(API.PROFILES_API.CREATE, payload);
  },
};
