import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit {

  @Output() stock = new EventEmitter<string>();
  stockForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.stockForm = new FormGroup({
      symbol: new FormControl('', Validators.required)
    })
  }

  searchBySymbol() {
    let stockSymbol = this.stockForm.controls['symbol'].value.toUpperCase();
    localStorage.setItem("stock_symbol_" + Date.now(), stockSymbol);
    
    this.stock.emit(stockSymbol);

    this.stockForm.reset();
  }

}
