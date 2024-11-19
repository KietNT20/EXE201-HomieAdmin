import { Category, JobPost, User } from './types.common'
export type Token = string
export type Response<T> = {
  data: T
  message: string
  status: number
}

export type TokenResponse = {
  token: Token
}

export interface LoginResponse {
  data: {
    data: {
      tokenString: string
    }
  }
}

export interface CategoryResponse {
  data: Category[]
}

export interface UserListResponse {
  data: {
    data: {
      result: User[]
      totalPages?: number
      currentPage?: number
      pageSize?: number
      totalItems?: number
    }
  }
}

export interface EWalletUserResponse {
  data: {
    data: {
      userId: number
      balance: number
    }
  }
}

export interface JobPostResponse {
  data: {
    data: JobPost[]
  }
}

export interface UserResponse {
  data: {
    data: User
  }
}