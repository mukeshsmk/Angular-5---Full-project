import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableListComponent } from './table-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'table-list', component: TableListComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TableListRoutingModule {}
