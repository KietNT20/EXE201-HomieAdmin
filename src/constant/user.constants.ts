import { RoleUser } from '@/types/types.common'

export const ROLE_NAMES = {
  [RoleUser.ADMIN]: 'Admin',
  [RoleUser.CUSTOMER]: 'Khách hàng',
  [RoleUser.EMPLOYEE]: 'Nhân viên',
  [RoleUser.STAFF]: 'Nhân viên quản lý',
} as const

export const ROLE_COLORS = {
  [RoleUser.ADMIN]: 'red',
  [RoleUser.CUSTOMER]: 'blue',
  [RoleUser.EMPLOYEE]: 'green',
  [RoleUser.STAFF]: 'orange',
} as const
