import { Component, OnInit, Input } from "@angular/core";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-driver-form",
  templateUrl: "driver-form.component.html",
  styleUrls: ["driver-form.component.css"]
})
export class DriverFormComponent implements OnInit {
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
