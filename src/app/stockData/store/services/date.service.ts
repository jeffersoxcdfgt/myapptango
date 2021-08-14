import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError , tap} from 'rxjs/operators';
import { TraceService } from '../../../shared/utils/traceService';
import { environment } from '../../../../environments/environment';
import { DateCustom} from '../class/date'


@Injectable()
export class DateService {
  protected URL = environment.urlapi;
  constructor(private http: HttpClient , private traceService: TraceService){ }

  /**
   * Get Date
   * @returns gets the list of objects found
   */
   public findDate(datestring?): Observable<DateCustom>{
    return this.http.get<DateCustom[]>(`${this.URL}${datestring.data}`).pipe(
      tap(_ => this.traceService.log('fetched contratos')),
        catchError(this.traceService.handleError<DateCustom>('findDate'))
    )
}
}
