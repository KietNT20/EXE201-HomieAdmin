import { API } from '@/api/apiUrl';
import { ApplicationPayload } from '@/types/types.payload';
import axiosInstance from '@/util/axiosInstance';

export const applicationService = {
  createApplication(payload: ApplicationPayload) {
    return axiosInstance.post(API.APPLICATION_API.CREATE, payload);
  },
  updateStatus(applicationId: number, status: string) {
    return axiosInstance.put(
      `${API.APPLICATION_API.UPDATE_STATUS}/${applicationId}?status=${status}`
    );
  },
  getAllApplications() {
    return axiosInstance.get(API.APPLICATION_API.GET_ALL);
  },
  getApplicationById(id: number) {
    return axiosInstance.get(API.APPLICATION_API.GET_BY_ID + id);
  },
  getApplicationByUserId(userId: number) {
    return axiosInstance.get(API.APPLICATION_API.GET_BY_USER_ID + userId);
  }
};
