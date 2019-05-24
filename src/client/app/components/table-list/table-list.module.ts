import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TableListComponent } from "./table-list.component";
import { TableListRoutingModule } from "./table-list-routing.module";
import { TabsComponent } from "../tab/tabs.component";
import { TabComponent } from "../tab/tab.component";
import { DynamicTabsDirective } from "../tab/dynamic-tabs.directive";
import { CommonModule } from "@angular/common";
import { UserdetailsComponent } from "../user-details/userdetails.component";
import { OpportunityComponent } from "../opportunity/opportunity.component";
import { DriverComponent } from "../driver/driver.component";
import { CustomerComponent } from "./../customer/customer.component";
import { StockComponent } from "./../stock/stock.component";
import { OpportunityFormComponent } from "./../opportunity-form/opportunity-form.component";
import { DriverFormComponent } from "./../driver-form/driver-form.component";
import { CustomerFormComponent } from "./../customer-form/customer-form.component";
import { VehicleStockFormComponent } from "./../vehiclestock-form/vehiclestock-form.component";
import { NavFormComponent } from "./../nav-form/nav-form.component";
import { ActivitiesComponent } from "./../activities/activities.component";
import { NavigationBarComponent } from "./../navigation-bar/navigation-bar.component";
import { DashboardComponent } from "./../dashboard/dashboard.component";
import { ProfileComponent } from "../profile/profile.component";
import { GeneralService } from "../../shared/services/GeneralService";
import { CalendarModule } from "../calendar/calendar.module";

@NgModule({
  imports: [
    TableListRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    TableListComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    UserdetailsComponent,
    OpportunityComponent,
    DriverComponent,
    CustomerComponent,
    StockComponent,
    OpportunityFormComponent,
    DriverFormComponent,
    CustomerFormComponent,
    VehicleStockFormComponent,
    ActivitiesComponent,
    NavFormComponent,
    NavigationBarComponent
  ],
  exports: [TableListComponent],
  entryComponents: [TabComponent],
  providers: [GeneralService]
})
export class TableListModule {}
