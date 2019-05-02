import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalRoutingModule } from './modal-routing.module';

@NgModule({
  imports: [ModalRoutingModule],
  declarations: [ModalComponent],
  exports: [ModalComponent]
})
export class ModalModule {}
