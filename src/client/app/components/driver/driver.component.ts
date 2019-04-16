import { Component, OnInit,Input } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-driver',
  templateUrl: 'driver.component.html',
  styleUrls: ['driver.component.css']
})
export class DriverComponent implements OnInit {
  visibleOne : Boolean = false;
  visibleTwo : Boolean = true;
  
  @Input() driver:any;

  constructor() { }

  ngOnInit() {
    
  }

}
