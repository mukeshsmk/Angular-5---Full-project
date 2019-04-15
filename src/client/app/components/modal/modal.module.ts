import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import {  ModalRoutingModule } from './modal-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    ModalRoutingModule],
  declarations: [ ModalComponent],
  exports: [ ModalComponent]
})
export class  ModalModule { }
