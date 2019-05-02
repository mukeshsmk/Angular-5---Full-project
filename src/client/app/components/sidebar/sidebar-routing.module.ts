import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: 'sidebar', component: SidebarComponent }])
  ],
  exports: [RouterModule]
})
export class SidebarRoutingModule {}
