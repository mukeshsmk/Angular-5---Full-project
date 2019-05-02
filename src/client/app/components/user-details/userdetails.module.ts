import { NgModule } from '@angular/core';
import { UserdetailsComponent } from './userdetails.component';
import { UserdetailsRoutingModule } from './userdetails-routing.module';

@NgModule({
  imports: [UserdetailsRoutingModule],
  declarations: [UserdetailsComponent],
  exports: [UserdetailsComponent]
})
export class UserdetailsModule {}
