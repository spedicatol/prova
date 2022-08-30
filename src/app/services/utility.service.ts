import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  //remove the stock from localStorage based on the symbol
  removeStockInLocalStorageBySymbol(symbol){
    for (let key of Object.keys({ ...localStorage })) {      
      if((JSON.parse(localStorage.getItem(key)) as Stock).symbol === symbol)
      localStorage.removeItem(key);
    } 
  }

  //get all the stocks stored in the localStorage
  getStockList(){
    let list = [];
    for (let value of Object.values({ ...localStorage })) {      
      list.push(JSON.parse(value));
    }

    return list;
  }

  //check if a stock is already in the list
  stockIsAlreadyStored(symbol){
   
    for (let value of Object.values({ ...localStorage })) {  
      let stock = JSON.parse(value);
      if(stock.symbol === symbol)
        return true;
    } 

    return false;
  }
}
