import { STORAGE } from '@/constant/stogare';
import { TokenResponse } from '@/types/types.response';

export const localToken = {
  get: (): TokenResponse | null =>
    JSON.parse(localStorage.getItem(STORAGE.token) || '{}') as TokenResponse,
  set: (token?: TokenResponse) =>
    localStorage.setItem(STORAGE.token, JSON.stringify(token)),
  remove: () => localStorage.removeItem(STORAGE.token)
};
const tokenMethod = {
  get: () => {
    return localToken.get();
  },
  set: (token?: TokenResponse) => {
    // console.log('token', token);
    localToken.set(token);
  },
  remove: () => {
    localToken.remove();
  }
};

export default tokenMethod;
