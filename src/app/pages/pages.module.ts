import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { StockSentimentComponent } from '../component/stock-sentiment/stock-sentiment.component';
import { ComponentsModule } from '../component/components.module';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { MonthPipe } from '../pipe/month.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    StockSentimentComponent,
    NotFoundComponent,
    MonthPipe
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DataService]
})
export class PagesModule { }
