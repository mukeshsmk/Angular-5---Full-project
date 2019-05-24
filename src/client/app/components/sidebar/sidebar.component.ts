import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GeneralService } from "../../shared/services/GeneralService";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-sidebar",
  templateUrl: "sidebar.component.html",
  styleUrls: ["sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  userData: any;
  role: any = 0;

  constructor(private router: Router, private generalService: GeneralService) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.role = this.userData.roleid;
  }

  godashboard(event: Event) {
    event.preventDefault();
    this.generalService.openDashboard();
  }

  goDairy(event: Event) {
    event.preventDefault();
    this.generalService.openCalendar();
  }
}
