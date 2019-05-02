import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgetComponent } from './forget.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: 'forget', component: ForgetComponent }])
  ],
  exports: [RouterModule]
})
export class ForgetRoutingModule {}
