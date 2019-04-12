import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './forget.component';
import { ForgetRoutingModule } from './forget-routing.module';

@NgModule({
  imports: [CommonModule, ForgetRoutingModule],
  declarations: [ForgetComponent],
  exports: [ForgetComponent]
})
export class ForgetModule { }
