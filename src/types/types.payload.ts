import { User } from './types.common'

export interface ApplicationPayload {
  jobId: number
  workerId: number
  message?: string
}

export interface JobPostPayload {
  userId: number
  title: string
  description: string
  location: string
  squareMeters: number
  numberOfFloors: number
  startDate: string
  endDate: string
  status: string
  createDate: string
  categorys: Array<{
    categoryId: number
  }>
}

export interface EWalletPayload {
  userId: number
  balance: number
}

export type UserPayload = Omit<User, 'id'>
