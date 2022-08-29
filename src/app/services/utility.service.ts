import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  removeStockInLocalStorageBySymbol(symbol){
    for (let key of Object.keys({ ...localStorage })) {      
      if((JSON.parse(localStorage.getItem(key)) as Stock).symbol === symbol)
      localStorage.removeItem(key);
    } 
  }

  getStockList(){
    let list = [];
    for (let value of Object.values({ ...localStorage })) {      
      list.push(JSON.parse(value));
    }

    return list;
  }
}
