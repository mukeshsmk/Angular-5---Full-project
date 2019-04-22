import { Component, OnInit, Input } from "@angular/core";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-opportunity-form",
  templateUrl: "opportunity-form.component.html",
  styleUrls: ["opportunity-form.component.css"]
})
export class OpportunityFormComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;
  visibleThree: Boolean = true;
  visibleFour: Boolean = true;
  visibleFive: Boolean = true;
  visibleSix: Boolean = true;
  visibleSeven: Boolean = true;

  @Input() opportunity: any;

  constructor() {}

  ngOnInit() {}
}
