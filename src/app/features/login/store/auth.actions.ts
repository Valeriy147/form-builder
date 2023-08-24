import { createAction, props } from '@ngrx/store';

export enum FormActions {
  changeAccessFlag = '[AUTH] change login again flag',
  setLoading = '[AUTH] set loading',
  setUserLogin = '[AUTH] set user login'
}

export const changeAccessFlag = createAction(
  FormActions.changeAccessFlag,
  props<{ data: boolean }>()
);

export const setLoading = createAction(
  FormActions.setLoading,
  props<{ data: boolean }>()
);

export const setUserLogin = createAction(
  FormActions.setUserLogin,
  props<{ data: string }>()
)

