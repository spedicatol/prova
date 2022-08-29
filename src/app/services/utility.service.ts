import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  crea(list, sentiment, key) {
    if (list['count'] != 0) {
      let stockRes = list['result'].find(obj => {
        return obj.symbol === key;
      });
      stockRes = stockRes ? stockRes : null;
      if (stockRes) {
        stockRes.sentiment = sentiment;
      }
      return stockRes;
    }

   
  }

  removeStockInLocalStorageBySymbol(symbol){
    for (let key of Object.keys({ ...localStorage })) {      
      if(localStorage.getItem(key) === symbol)
      localStorage.removeItem(key);
    } 
  }
}
