import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { Sentiment } from '../../model/sentiment';
import { Stock } from '../../model/stock';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css']
})
export class StockSentimentComponent implements OnInit {
  stockDetail: Stock;
  sentiments: Sentiment[];
  noData: boolean = false;
  loadedStock: boolean = false;
  constructor(private route: ActivatedRoute, private data: DataService, private utility: UtilityService) { }

  ngOnInit(): void {
    this.getInsiderTrend();
  }

  getInsiderTrend() {
    //get Route Parameter (:/symbol)
    this.route.params.subscribe(r => {

      let stock = r['symbol'];

      //get the list of stock from the localStorage
      let stockList = this.utility.getStockList();

      //find the matching stock
      this.stockDetail = stockList.find(obj => {
        return obj.symbol === stock;
      });

      //get insider trend from API
      let getInsider = this.data.getInsiderSentiment(stock);

      getInsider.subscribe({
        next: (res) => {
          this.sentiments = res['data'];
          if (this.sentiments.length === 0)
            this.noData = true;

          this.loadedStock = true;
        },
        error: (err) => {
          this.noData = true;
          this.loadedStock = true;
        }

      })
    })
  }

}
