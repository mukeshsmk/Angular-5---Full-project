import { Component, OnInit, Input } from "@angular/core";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-vehiclestock-form",
  templateUrl: "vehiclestock-form.component.html",
  styleUrls: ["vehiclestock-form.component.css"]
})
export class VehicleStockFormComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;
  
 
  @Input() opportunity: any;

  constructor() {}

  ngOnInit() {}
}
