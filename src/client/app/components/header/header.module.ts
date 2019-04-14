import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';


@NgModule({
  imports: [HeaderRoutingModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { 
}
