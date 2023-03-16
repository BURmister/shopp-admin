import { IAuthData, removeTokenStorage, saveTokenStorage, saveToStorage } from './auth.helper';
import { axiosClassic } from '../api/interceptors';

export const AuthService = {
   async login(name: string, password: string) {
      const response = await axiosClassic.post<IAuthData>('/auth/login', {
         name,
         password,
      });

      if (response.data.access_token) saveTokenStorage(response.data);

      return response.data;
   },

   async register(name: string, password: string) {
      const response = await axiosClassic.post<IAuthData>('/auth/register', {
         name,
         password,
      });

      if (response.data.access_token) saveTokenStorage(response.data);

      return response.data;
   },

   logout() {
      removeTokenStorage();
   },
};
