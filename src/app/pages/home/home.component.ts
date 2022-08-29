import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stockList: string[] = [];
  constructor(private data: DataService, private utility: UtilityService) { }

  ngOnInit(): void {

    for (let value of Object.values({ ...localStorage })) {      
      this.stockList.push(value);
    }

  }

  stockDelete(evt){
    let index = this.stockList.indexOf(evt);
    this.stockList.splice(index, 1);
    this.utility.removeStockInLocalStorageBySymbol(evt);
  }

  getStock(evt) {
    this.stockList.push(evt);
  }
}
