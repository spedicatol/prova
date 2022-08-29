import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/model/stock';
import { DataService } from 'src/app/services/data.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit {

  @Output() stock = new EventEmitter<Stock>();
  stockForm: FormGroup;
  showSpinner: boolean = false;

  constructor(private data: DataService, private utility: UtilityService) { }

  ngOnInit(): void {
    this.stockForm = new FormGroup({
      symbol: new FormControl('', Validators.required)
    })
  }


  searchBySymbol() {
    let stockSymbol = this.stockForm.controls['symbol'].value.toUpperCase();

    //check if stock is already in local storage
    let isStored = this.utility.stockIsAlreadyStored(stockSymbol);

    if (!isStored) {
      this.showSpinner = true;

      let search = this.data.search(stockSymbol);
      search.subscribe({
        next: (res) => {
          this.showSpinner = false;

          if (res['count'] != 0) {

            let stockRes = res['result'].find(obj => {
              return obj.symbol === stockSymbol;
            });

            if (stockRes) {
              localStorage.setItem("stock_" + Date.now(), JSON.stringify(stockRes));
              this.stock.emit(stockRes);
            } else {
              alert("Stock not found");
            }

          }
          this.stockForm.reset();

        },
        error: (err) => {
          this.showSpinner = false;
          alert("Error");

          this.stockForm.reset();
        }
      });
    } else {
      alert("Stock already in list");
      this.stockForm.reset();
    }

  }

}
