import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Sentiment } from '../model/sentiment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpClient: HttpClient) { }

  search(stockName) {

    let token = environment.token;
    let baseUrl = environment.apiUrl;
    let params = new HttpParams({ fromString: 'q=' + stockName + '&token=' + token });

    return this.httpClient
      .get(baseUrl + "/search", { params: params })
      .pipe(catchError(this.handleError));
  }

  searchStockBySymbol(symbol: string) {
    let token = environment.token;
    let baseUrl = environment.apiUrl;
    let params = new HttpParams({ fromString: 'symbol=' + symbol + '&token=' + token });

    return this.httpClient
      .get<Sentiment>(baseUrl + "/quote", { params: params });
      //.pipe(catchError(this.handleError));
  }

  getInsiderSentiment(symbol: string) {
    let token = environment.token;
    let baseUrl = environment.apiUrl;
    let fromDate = moment(new Date()).subtract(3, 'months').set("D", 1).format('YYYY-MM-DD');
    let toDate = moment(new Date()).subtract(1, 'months').set("D", 1).format('YYYY-MM-DD')
    
    let params = new HttpParams({ fromString: 'symbol=' + symbol + "&from=" + fromDate + "&to=" + toDate + '&token=' + token });

    return this.httpClient
      .get<Sentiment>(baseUrl + "/stock/insider-sentiment", { params: params })
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
