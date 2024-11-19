import { jobPostService } from '@/services/jobPostService'
import { JobPostResponse } from '@/types/types.response'
import { useQuery } from '@tanstack/react-query'

export const useGetAllJobPosts = () => {
  const { data, ...rest } = useQuery<JobPostResponse>({
    queryKey: ['jobPosts'],
    queryFn: () => jobPostService.getJobPosts(),
    staleTime: 10000,
    throwOnError: true,
  })

  return {
    data,
    ...rest,
  }
}

export const useGetAllJobPostsPending = () => {
  const { data, ...rest } = useQuery<JobPostResponse>({
    queryKey: ['jobPostsPending'],
    queryFn: () => jobPostService.getJobPostPending(),
    staleTime: 10000,
    throwOnError: true,
  })

  return {
    data,
    ...rest,
  }
}

export const useGetJobPostById = (jobPostId?: string | number | null) => {
  const { data, ...rest } = useQuery({
    queryKey: ['jobPostDetail', jobPostId],
    queryFn: () => jobPostService.getJobPostById(Number(jobPostId!)),
    enabled: !!jobPostId,
    staleTime: 10000,
    throwOnError: false,
  })

  return {
    data,
    ...rest,
  }
}

export const useGetJobPostByUserId = (userId: number) => {
  const { data: jobPostUserData, ...rest } = useQuery({
    queryKey: ['jobPostByUserId', userId],
    queryFn: () => jobPostService.getJobPostByUserId(userId),
    throwOnError: true,
  })

  return {
    jobPostUserData,
    ...rest,
  }
}
