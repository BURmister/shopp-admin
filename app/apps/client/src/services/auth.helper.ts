import Cookies from 'js-cookie';

export interface IAuthData {
   user: {
      _id: string;
      name: string;
   } | null;
   access_token: string;
}

export const saveTokenStorage = (data: IAuthData) => {
   Cookies.set('access_token', data.access_token);
};

export const removeTokenStorage = () => {
   Cookies.remove('access_token');
};

export const saveToStorage = (data: IAuthData) => {
   saveTokenStorage(data);
   localStorage.setItem('user', JSON.stringify(data.user));
};
