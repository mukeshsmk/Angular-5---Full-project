import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { TableListModule } from '../components/table-list/table-list.module';
import { HeaderModule } from '../components/header/header.module';
import { DashboardModule } from '../components/dashboard/dashboard.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
    SidebarModule,
    TableListModule,
    HeaderModule,
    DashboardModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
