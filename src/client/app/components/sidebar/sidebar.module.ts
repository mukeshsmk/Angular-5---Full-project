import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar.component";
import { SidebarRoutingModule } from "./sidebar-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [SidebarRoutingModule, CommonModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class SidebarModule {}
