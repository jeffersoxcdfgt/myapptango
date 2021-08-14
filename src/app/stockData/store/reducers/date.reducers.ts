import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector, on , createReducer  } from '@ngrx/store';
import { DateCustom } from '../class/date';
import  * as datecustomActions from '../actions/date.actions';

export interface State {
  data:DateCustom[];
  selected:DateCustom;
  action:string;
  done:boolean;
  error?:Error;
}

const initialState: State  = {
  data:[],
  selected:null,
  action:null,
  done:false,
  error:null
}

export const datecustomReducer = createReducer(
  initialState,
  //Get date custom
  on(datecustomActions.customGetDate, state => 
    ({
       ...state, 
       action:datecustomActions.DateActionTypes.GET_DATE, 
       done:false, 
       selected:null, 
       error:null 
      })),
  on(datecustomActions.customGetDateSuccess, (state, { data }) => 
  ({ 
    ...state, selected:data, 
    done: true, 
    error: 
     null
    })),
  on(datecustomActions.customGetDateError, (state, { err }) => 
  ({ 
    ...state,
     done:true, 
     selected:null,
      error:err 
   })),

);

export function reducer(state: State | undefined, action: AppAction) {
  return datecustomReducer(state, action);
}
export const getDateState = createFeatureSelector < State > ('datecustom');



//Selector for Get Date custom

export const getDateCustom = createSelector( getDateState , ( state : State ) => {
  if(state.action ===  datecustomActions.DateActionTypes.GET_DATE && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const getDateCustomError = createSelector(getDateState, (state: State) => {
  return state.action === datecustomActions.DateActionTypes.GET_DATE_ERROR
    ? state.error
   : null;
});
