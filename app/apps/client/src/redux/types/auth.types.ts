export interface IAuthInitialState {
   isLoggedIn: boolean;
   isLoading: boolean;
}

export interface IAuth {
   name: string;
   password: string;
}

export interface IAuthResponse {
   user: { _id: string; name: string } | null;
   access_token: string;
}
