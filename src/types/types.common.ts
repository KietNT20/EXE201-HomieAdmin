import { JobPostStatus } from './types.utils'

export enum RoleUser {
  ADMIN = 1,
  CUSTOMER = 2,
  EMPLOYEE = 3,
  STAFF = 4,
}

export interface User {
  id?: number
  name?: string
  email?: string
  password?: string
  phone?: string
  dateOfBirth?: Date | null
  gender?: 'Male' | 'Female'
  roleId?: RoleUser
  status?: boolean
}

export interface Profile {
  userID?: number
  bio?: string
  skill?: string
  experience?: string
  availability?: string
  ratingAvg?: number
}

export interface Transaction {
  transactionId: number
  walletId?: number
  userId?: number
  transactionType?: string
  amount?: number
  transactionDate?: number
  description?: string
  eWallet?: string
}
export interface Category {
  id: number
  categoryName?: string
  price?: number
}

export interface JobPost {
  jobId: number
  employerId: number
  title: string
  description: string
  location: string
  squareMeters: number
  numberOfFloors: number
  startDate: string
  endDate: string
  price: number
  status: JobPostStatus
  createDate: string
  categoryJobPost: [
    {
      categoriesId: number
    },
  ]
}
