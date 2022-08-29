import { keyframes } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Stock } from '../../model/stock';
import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

  @Input() stock: Stock;
  @Output() stockToDelete: EventEmitter<Stock> = new EventEmitter<Stock>();

  loadedStock: boolean = false;
  foundStock: boolean = false;
  constructor(private data: DataService, private utility: UtilityService) { }

  ngOnInit(): void {
    
    let searchBySymbol = this.data.searchStockBySymbol(this.stock.symbol.toUpperCase());

    searchBySymbol.subscribe({
      next: (res) => {
        this.loadedStock = true;
        this.stock.sentiment = res;
        this.foundStock = this.stock != null;
      },
      error: (err) => {
        this.foundStock = false;
        this.loadedStock = true;
      }
    });
  }

  removeStock() {
    this.stockToDelete.emit(this.stock);
  }

}
