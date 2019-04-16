import { Component, OnInit } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-userdetails',
  templateUrl: 'userdetails.component.html',
  styleUrls: ['userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  visibleOne : Boolean = false;
  visibleTwo : Boolean = true;
  
  
  constructor() { }

  ngOnInit() {
    
  }

}
