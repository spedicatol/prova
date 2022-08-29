import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Sentiment } from 'src/app/model/sentiment';
import { Stock } from 'src/app/model/stock';
import { DataService } from 'src/app/services/data.service';

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
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      let stock = r['symbol'];
      let search = this.data.search(stock);
      let getInsider = this.data.getInsiderSentiment(stock);

      forkJoin({
        stock: search,
        sentiment: getInsider
      }).subscribe({
        next: (res) => {
          this.stockDetail = res.stock['result'].find(obj => {
            return obj.symbol === stock;
          });
          this.sentiments = res.sentiment['data'];
          if (this.sentiments.length === 0)
            this.noData = true;

          this.loadedStock = true;
        },
        error: (err) => {
          this.noData = true;
          this.loadedStock = true;
        }
      });
    })
  }

}
