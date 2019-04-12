import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './forget.component';
import { ForgetRoutingModule } from './forget-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    ForgetRoutingModule],
  declarations: [ForgetComponent],
  exports: [ForgetComponent]
})
export class ForgetModule { }
