import { Component, OnInit, Input } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sd-opportunity',
  templateUrl: 'opportunity.component.html',
  styleUrls: [ 'opportunity.component.css' ]
})
export class OpportunityComponent {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;
  visibleThree: Boolean = true;
  visibleFour: Boolean = true;
  visibleFive: Boolean = true;
  visibleSix: Boolean = true;
  visibleSeven: Boolean = true;
  @Input() opportunity: any;
}
