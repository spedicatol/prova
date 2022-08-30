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
  showAlert: boolean = false;
  showError: boolean = false;
  messageText: string = '';

  constructor(private data: DataService, private utility: UtilityService) { }

  ngOnInit(): void {
    this.stockForm = new FormGroup({
      symbol: new FormControl('', Validators.pattern('^[a-zA-Z ]*$'))
    })
  }


  searchBySymbol() {

    this.showAlert = false;
    this.showError = false;

    let stockSymbol = this.stockForm.controls['symbol'].value.toUpperCase().trim();

    //check if stock is already in local storage
    let isStored = this.utility.stockIsAlreadyStored(stockSymbol);

    //if the stock is not stored
    if (!isStored) {
      this.showSpinner = true;
      //search for stock
      let search = this.data.search(stockSymbol);
      search.subscribe({
        next: (res) => {
          this.showSpinner = false;

          if (res['count'] != 0) {
            //takes the matching stock among those returned from the API
            let stockRes = res['result'].find(obj => {
              return obj.symbol === stockSymbol;
            });

            //if there is a match, store the stock in the localStorage
            if (stockRes) {
              localStorage.setItem("stock_" + Date.now(), JSON.stringify(stockRes));
              this.stock.emit(stockRes);
            } else {
              this.showError = true;
              this.messageText = "Stock " + stockSymbol + " not found!";
            }

          }
          this.stockForm.reset();

        },
        error: (err) => {
          this.showSpinner = false;
          this.showError = true;
          this.messageText = "An error occurred!";
          this.stockForm.reset();
        }
      });
    } else {
      this.showAlert = true;
      this.messageText = "Stock " + stockSymbol + " is already in the list!";
      this.stockForm.reset();
    }

  }

}
