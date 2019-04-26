import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"]
})
export class HeaderComponent implements OnInit {
  userData:any;
  constructor(private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user_data"))
  }

  ngOnInit() {}
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
    this.router.navigate(["/login"]);
  }
}
