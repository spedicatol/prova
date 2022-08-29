import { keyframes } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Stock } from 'src/app/model/stock';
import { DataService } from 'src/app/services/data.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

  @Input() stock: string;
  @Output() stockToDelete: EventEmitter<string> = new EventEmitter<string>();

  stockDetail: Stock;
  loadedStock: boolean = false;
  foundStock: boolean = false;
  constructor(private data: DataService, private utility: UtilityService) { }

  ngOnInit(): void {
    let search = this.data.search(this.stock);
    let searchBySymbol = this.data.searchStockBySymbol(this.stock.toUpperCase());

    forkJoin({
      stock: search,
      sentiment: searchBySymbol
    }).subscribe({
      next: (res) => {
        this.loadedStock = true;
        this.stockDetail = this.utility.crea(res.stock, res.sentiment, this.stock);
        this.foundStock = this.stockDetail != null;
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
