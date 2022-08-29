import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stockList: Stock[] = [];
  constructor(private data: DataService, private utility: UtilityService) { }

  ngOnInit(): void {
    this.stockList = this.utility.getStockList();  }

  stockDelete(evt){
    let symbol = evt.symbol;
    this.utility.removeStockInLocalStorageBySymbol(symbol);
    this.stockList = this.utility.getStockList();
  }

  getStock(evt) {
    this.stockList.push(evt);
  }


}
