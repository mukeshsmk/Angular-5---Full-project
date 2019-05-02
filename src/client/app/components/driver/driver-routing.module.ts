import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DriverComponent } from './driver.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: 'driver', component: DriverComponent }])
  ],
  exports: [RouterModule]
})
export class DriverRoutingModule {}
