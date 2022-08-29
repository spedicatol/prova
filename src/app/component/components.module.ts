import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCardComponent } from './stock-card/stock-card.component';
import { SearchStockComponent } from './search-stock/search-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MonthPipe } from '../pipe/month.pipe';
import { ImageIndicatorComponent } from './image-indicator/image-indicator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { WarningTextComponent } from './warning-text/warning-text.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    SearchStockComponent,
    StockCardComponent,
    ImageIndicatorComponent,
    SpinnerComponent,
    WarningTextComponent
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
    WarningTextComponent
  ]
})
export class ComponentsModule { }
