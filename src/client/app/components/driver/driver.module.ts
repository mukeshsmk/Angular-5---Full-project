import { NgModule } from '@angular/core';
import { DriverComponent } from './driver.component';
import { DriverRoutingModule } from './driver-routing.module';

@NgModule({
  imports: [DriverRoutingModule],
  declarations: [DriverComponent],
  exports: [DriverComponent]
})
export class DriverModule { 

}
