import { NgModule } from '@angular/core';
import { TableListComponent } from './table-list.component';
import { TableListRoutingModule } from './table-list-routing.module';
import { TabsComponent } from '../tab/tabs.component';
import { TabComponent } from '../tab/tab.component';
import { DynamicTabsDirective } from '../tab/dynamic-tabs.directive';
import { CommonModule } from '@angular/common';
import { UserdetailsComponent } from '../user-details/userdetails.component';

@NgModule({
  imports: [TableListRoutingModule,CommonModule],
  declarations: [TableListComponent,TabsComponent,TabComponent,DynamicTabsDirective,UserdetailsComponent],
  exports: [TableListComponent],
  entryComponents: [TabComponent]
})
export class TableListModule { 


}
