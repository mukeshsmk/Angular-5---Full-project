import { Component, OnInit } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-opportunity',
  templateUrl: 'opportunity.component.html',
  styleUrls: ['opportunity.component.css']
})
export class OpportunityComponent implements OnInit {
  visibleOne : Boolean = false;
  constructor() { }
  ngOnInit() {
    
  }

}
