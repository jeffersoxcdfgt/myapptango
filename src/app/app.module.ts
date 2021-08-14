
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import * as dateReducers from './stockData/store/reducers/date.reducers';
import { DateCustomEffects } from './stockData/store/effects/date.effects';

import { StockData } from './stockData/stockData.component';
//Angular Router Module
import { RouterModule, Router } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TraceService } from './shared/utils/traceService';
import { DateService } from './stockData/store/services/date.service';


export const reducers: ActionReducerMap<any> = {
  datecustom:dateReducers.reducer
}


@NgModule({
  declarations: [
    AppComponent,
    StockData
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path:'', component: StockData }
    ]),
   StoreModule.forRoot(reducers,{ 
    runtimeChecks: {
     strictStateImmutability: true,
     strictActionImmutability: true
   }
  }),
  EffectsModule.forRoot([
    DateCustomEffects
  ]),
  ],
  exports: [
    RouterModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    TraceService,
    DateService
  ],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
