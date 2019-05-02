import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userData: any;
  role: any = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    this.role = this.userData.roleid;
  }

  godashboard() {
    this.router.navigate(['/dashboard']);
    console.log('check');
  }
}
