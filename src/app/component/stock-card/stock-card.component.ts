import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock } from '../../model/stock';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

  @Input() stock: Stock;
  @Output() stockToDelete: EventEmitter<string> = new EventEmitter<string>();

  loadedStock: boolean = false;
  foundStock: boolean = false;
  constructor(private data: DataService) { }

  ngOnInit(): void {

    //add sentiment information to stock (input variable)
    this.getStock();
 
  }


  getStock(){
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
    this.stockToDelete.emit(this.stock.symbol);
  }

}
