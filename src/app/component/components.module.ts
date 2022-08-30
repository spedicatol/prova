import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCardComponent } from './stock-card/stock-card.component';
import { SearchStockComponent } from './search-stock/search-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ImageIndicatorComponent } from './image-indicator/image-indicator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    SearchStockComponent,
    StockCardComponent,
    ImageIndicatorComponent,
    SpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    SearchStockComponent,
    StockCardComponent,
    ImageIndicatorComponent,
    SpinnerComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }
