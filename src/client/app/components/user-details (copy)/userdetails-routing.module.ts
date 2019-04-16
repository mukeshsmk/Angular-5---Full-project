import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserdetailsComponent } from './userdetails.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'userdetails', component: UserdetailsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class UserdetailsRoutingModule { }
