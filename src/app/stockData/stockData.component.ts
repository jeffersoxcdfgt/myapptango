import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { customGetDate } from './store/actions/date.actions';
import { getDateCustom } from './store/reducers/date.reducers';
import { Observable } from 'rxjs';
import { DateCustom } from './store/class/date';

@Component({
  selector: 'stock-data',
  templateUrl: './stockData.component.html',
  styleUrls: ['./stockData.component.scss']
})
export class StockData implements OnInit {

  dataDate: Observable<DateCustom>
  dateSet:string

  constructor(private http: HttpClient,
    private store: Store<AppState>,) {
  }

  ngOnInit() {
  }

  searchDate = () =>{
    this.store.dispatch(customGetDate({data:this.dateSet,}));
    this.dataDate=this.store.select(getDateCustom)
  }

}
