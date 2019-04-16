import { Component, OnInit } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.css']
})
export class CustomerComponent implements OnInit {
  visibleOne : Boolean = false;
  visibleTwo : Boolean = true;
  visibleThree : Boolean = true;
  constructor() { }

  ngOnInit() {
    
  }

}
