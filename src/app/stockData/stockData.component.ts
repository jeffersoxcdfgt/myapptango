import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { customGetDate } from './store/actions/date.actions';
import { getDateCustom } from './store/reducers/date.reducers';

@Component({
  selector: 'stock-data',
  templateUrl: './stockData.component.html',
  styleUrls: ['./stockData.component.scss']
})
export class StockData implements OnInit {

  constructor(private http: HttpClient,
    private store: Store<AppState>,) {
  }

  ngOnInit() {
    this.store.dispatch(customGetDate({data:'5-January-2000'}));
    this.store.select(getDateCustom).subscribe((info)=>{
      if(info !=null){
          console.log(info,"------")
      }
    })

  }
}

interface Data {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[];
}
