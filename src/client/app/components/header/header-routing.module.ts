import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'header', component: HeaderComponent }
    ])
  ],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
