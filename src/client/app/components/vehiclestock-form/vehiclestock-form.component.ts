import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

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
  visibleThree: Boolean = true;
  visibleFour: Boolean = true;
  visibleFive: Boolean = true;
  visibleSix: Boolean = true;
  
  @Output() closeModalEvent = new EventEmitter<boolean>();

  @Input() vehicleStock: any;
  @Input() type: any;
  @Output("updatevehicleStock") send = new EventEmitter<any>();

  vehicleStockForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.vehicleStockForm = this.formBuilder.group({
      name: [this.vehicleStock.name, Validators.required],
      selling_dealer__c: [this.vehicleStock.selling_dealer__c],
      vin__c: [this.vehicleStock.vin__c],
      vehicle_type__c: [this.vehicleStock.vehicle_type__c],
      fuel_type__c: [this.vehicleStock.fuel_type__c],
      rego_no__c: [this.vehicleStock.rego_no__c],
      manufacture_year__c: [this.vehicleStock.manufacture_year__c],
      body_type__c: [this.vehicleStock.body_type__c],
      model__c: [this.vehicleStock.model__c],
      body_colour__c: [this.vehicleStock.body_colour__c],
      make__c: [this.vehicleStock.make__c],
      first_image_name__c: [this.vehicleStock.first_image_name__c],
      dealer_code__c: [this.vehicleStock.dealer_code__c],
      vehicle_stock_days__c: [this.vehicleStock.vehicle_stock_days__c],
      ownerid: [this.vehicleStock.ownerid],
      egc_price__c: [this.vehicleStock.egc_price__c],
      series_c__c: [this.vehicleStock.series_c__c],
      stock_image__c: [this.vehicleStock.stock_image__c]
    });
  }
  onCloseModal(event: any){
    this.closeModalEvent.emit(event);  
    console.log("Check")
   }


  onSubmit(){
    this.submitted = true;
    console.log(this.vehicleStockForm);

    if (this.vehicleStockForm.invalid) {
      return;
    }
    if (this.type == "edit") {
      this.vehicleStockForm.value.id = this.vehicleStock.id;
    }

    this.send.emit(this.vehicleStockForm.value);
  }
  closeOpportunityModal() {}
}
