import { NgModule } from '@angular/core';
import { StockComponent } from './stock.component';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
  imports: [StockRoutingModule],
  declarations: [StockComponent],
  exports: [StockComponent]
})
export class StockModule {}
