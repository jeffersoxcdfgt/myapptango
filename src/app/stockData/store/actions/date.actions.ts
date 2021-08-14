import { createAction, props } from '@ngrx/store';
import { DateCustom } from '../class/date';

export enum DateActionTypes {
  GET_DATE = '[GET_DATE] get date',
  GET_DATE_SUCESS = '[GET_DATE] get date sucess',
  GET_DATE_ERROR = '[GET_DATE] get date error',
  
}

// Date Custom

export const customGetDate = createAction(DateActionTypes.GET_DATE, props<{data: string}>());
export const customGetDateSuccess = createAction(DateActionTypes.GET_DATE_SUCESS, props<{data: DateCustom} >());
export const customGetDateError = createAction(DateActionTypes.GET_DATE_ERROR, props<{err: Error}>());


