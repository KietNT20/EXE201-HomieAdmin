import { Category, User } from './types.common'
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
