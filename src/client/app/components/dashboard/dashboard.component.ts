import { Component, OnInit } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  visibleOne : Boolean = false;
  visibleTwo : Boolean = true;
  
  
  constructor() { }

  ngOnInit() {
    
  }
 
}
