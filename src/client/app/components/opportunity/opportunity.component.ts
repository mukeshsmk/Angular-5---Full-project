import { Component, OnInit, Input } from '@angular/core';
import { OpportunityModule } from './opportunity.module';
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
  visibleTwo : Boolean = true;
  visibleThree : Boolean = true;
  visibleFour : Boolean = true;
  visibleFive : Boolean = true;
  visibleSix : Boolean = true;
  visibleSeven : Boolean = true;

  @Input() opportunity:any;
  
  constructor() { }

  ngOnInit() {
    
  }

}
