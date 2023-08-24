import { AuthState } from './../features/login/store/interfaces';
import { formReducer } from '../features/form-builder/store/form.reducer';
import { authReducer } from '../features/login/store/auth.reducer';
import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { FormState } from '../features/form-builder/store/interfaces';

export interface State {
  form: FormState;
  auth: AuthState
}

export const reducers: ActionReducerMap<State> = {
  form: formReducer,
  auth: authReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
