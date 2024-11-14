export type Token = string;
export type Response<T> = {
  data: T;
  message: string;
  status: number;
};
export type TokenResponse = {
  token: Token;
};

export interface LoginResponse {
  data: {
    data: {
      tokenString: string;
    };
  };
}
