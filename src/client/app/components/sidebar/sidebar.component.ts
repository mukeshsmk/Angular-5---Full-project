import { Component, OnInit } from '@angular/core';
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
  userData:any;
  role:any = 0;
  constructor() {
    
   }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.role = this.userData.roleid;
  }

}
