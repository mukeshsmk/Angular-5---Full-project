import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './resetpassword.component';
import { ResetPasswordRoutingModule } from './resetpassword-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    ResetPasswordRoutingModule],
  declarations: [ResetPasswordComponent],
  exports: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
