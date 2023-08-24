export interface AuthState {
  loginAgain: boolean,
  loading: boolean,
  userLogin: string
}

export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface AuthResponse {
  idToken: string
  expiresIn: string
}

