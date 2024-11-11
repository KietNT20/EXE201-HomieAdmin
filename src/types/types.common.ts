export enum RoleUser {
  ADMIN = 1,
  CUSTOMER = 2,
  EMPLOYEE = 3,
  STAFF = 4,
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  dateOfBirth?: Date | null;
  gender?: 'male' | 'female';
  roleId?: RoleUser;
}

export interface Profile {
  userID?: number;
  bio?: string;
  skill?: string;
  experience?: string;
  availability?: string;
  ratingAvg?: number;
}

export interface Transaction {
  transactionId?: number;
  walletId?: number;
  userId?: number;
  transactionType?: string;
  amount?: number;
  transactionDate?: number;
  description?: string;
  eWallet?: string;
}
export interface Category {
  id?: number;
  categoryName?: string;
  price?: number;
}

export type ActionReduxType = {
  type: string;
  payload?: any;
};

export type DispatchType<T> = (args: T) => T;
