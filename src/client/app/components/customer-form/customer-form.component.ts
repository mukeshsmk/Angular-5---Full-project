import { Component, OnInit, Input } from "@angular/core";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-customer-form",
  templateUrl: "customer-form.component.html",
  styleUrls: ["customer-form.component.css"]
})
export class CustomerFormComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;
  visibleThree: Boolean = true;
  visibleFour: Boolean = true;
 
  @Input() opportunity: any;

  constructor() {}

  ngOnInit() {}
}
