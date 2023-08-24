import { AuthState } from './interfaces';
import { createReducer, on } from '@ngrx/store';
import { changeAccessFlag, setLoading, setUserLogin } from './auth.actions';

export const auth = 'auth';

export const authInitialState: AuthState = {
  loginAgain: false,
  loading: false,
  userLogin: ''
};

export const authReducer = createReducer(
  authInitialState,
  on(changeAccessFlag, (state, action) => ({
    ...state,
    loginAgain: action.data
  })),
  on(setLoading, (state, action) => ({
    ...state,
    loading: action.data
  })),
  on(setUserLogin, (state, action) => ({
    ...state,
    userLogin: action.data
  }))
)







