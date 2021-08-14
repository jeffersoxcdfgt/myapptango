import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  of } from 'rxjs';
import { map, mergeMap, catchError  } from 'rxjs/operators';
import { DateService } from '../services/date.service';
import { DateCustom } from '../class/date';
import { DateActionTypes } from '../actions/date.actions';

@Injectable()
export class DateCustomEffects {


  public getDateCustom$ = createEffect(() => this.actions$.pipe(
    ofType(DateActionTypes.GET_DATE),
    mergeMap((datadate) => this.dateService.findDate(datadate)
      .pipe(
        map((datepass:DateCustom) => (
          { 
            type: DateActionTypes.GET_DATE_SUCESS, 
            data: datepass })),
          catchError(err => of({ type: DateActionTypes.GET_DATE_ERROR, err: err }))
      ))
    )
  );


  constructor(
    private actions$: Actions,
    private dateService: DateService
  ) {}
}