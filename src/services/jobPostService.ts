import { API } from '@/api/apiUrl'
import { JobPostPayload } from '@/types/types.payload'
import axiosInstance from '@/util/axiosInstance'

export const jobPostService = {
  getJobPosts: () => {
    return axiosInstance.get(`${API.JOB_POST_API.GET_ALL_ADMIN}`)
  },
  getJobPostPending: () => {
    return axiosInstance.get(`${API.JOB_POST_API.GET_ALL}`)
  },
  getJobPostById(jobPostId: number) {
    return axiosInstance.get(API.JOB_POST_API.GET_BY_ID + jobPostId)
  },
  createJobPost(payload: JobPostPayload) {
    return axiosInstance.post(API.JOB_POST_API.CREATE, payload)
  },
  getJobPostByUserId(userId: number) {
    return axiosInstance.get(API.JOB_POST_API.GET_BY_USER_ID + userId)
  },
}
