import { BASE_URL } from '@/config/environment'
import axios, { AxiosResponse } from 'axios'
import tokenMethod from './token'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
})
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = tokenMethod.get() as { token: string } | null
    config.headers.Authorization = `Bearer ${token?.token}`
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    )
  },
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    )
  },
)

export default axiosInstance
