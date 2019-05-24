import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from "../../shared/services/GeneralService";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  userData: any;
  constructor(private router: Router, private generalService: GeneralService) {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }
  goProfile(event: Event) {
    event.preventDefault();
    this.generalService.openProfile();
  }
}
