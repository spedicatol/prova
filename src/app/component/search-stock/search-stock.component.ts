import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/model/stock';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit {

  @Output() stock = new EventEmitter<Stock>();
  stockForm: FormGroup;
  showError: boolean = false;
  showSpinner: boolean = false;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.stockForm = new FormGroup({
      symbol: new FormControl('', Validators.required)
    })
  }


  searchBySymbol() {
    this.showSpinner = true;
    let stockSymbol = this.stockForm.controls['symbol'].value.toUpperCase();

    let search = this.data.search(stockSymbol);

    search.subscribe({
      next: (res) => {
        
        this.showSpinner = false;
        if (res['count'] != 0) {

          let stockRes = res['result'].find(obj => {
            return obj.symbol === stockSymbol;
          });

          if (stockRes) {
            localStorage.setItem("stock_symbol_" + Date.now(), JSON.stringify(stockRes));
            this.stock.emit(stockRes);
          }

        }
        this.stockForm.reset();
      },
      error: (err) => {
        this.showSpinner = false;
        this.showError = true;
        this.stockForm.reset();
      }
    });

  }

}
