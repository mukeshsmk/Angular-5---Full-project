import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

import { VehicleModelService } from "../../shared/services/VehicleModelService";
import { ApiService } from "../../shared/services/ApiServices";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sd-vehiclestock-form",
  templateUrl: "vehiclestock-form.component.html",
  styleUrls: ["vehiclestock-form.component.css"],
  providers: [VehicleModelService]
})
export class VehicleStockFormComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;
  visibleThree: Boolean = true;
  visibleFour: Boolean = true;
  visibleFive: Boolean = true;
  visibleSix: Boolean = true;

  searchOpen: Boolean = false;

  modelResult: Boolean = false;
  searchLoading: Boolean = false;

  @Output() closeModalEvent = new EventEmitter<Boolean>();

  @Input() vehicleStock: any;
  @Input() type: any;
  @Output("updatevehicleStock") send = new EventEmitter<any>();

  vehicleStockForm: FormGroup;
  submitted: Boolean = false;
  userData: any;
  searchTerm: any;

  sdname: any;

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleModelService,
    private apiSerivice: ApiService
  ) {}

  ngOnInit() {
    if (this.vehicleStock) {
      this.userData = JSON.parse(localStorage.getItem("user_data"));

      this.vehicleStockForm = this.formBuilder.group({
        name: [this.vehicleStock.name, Validators.required],
        selling_dealer__c: [this.vehicleStock.selling_dealer__c],
        vin__c: [this.vehicleStock.vin__c],
        vehicle_type__c: [this.vehicleStock.vehicle_type__c],
        fuel_type__c: [this.vehicleStock.fuel_type__c],
        rego_no__c: [this.vehicleStock.rego_no__c],
        manufacture_year__c: [this.vehicleStock.manufacture_year__c],
        body_type__c: [this.vehicleStock.body_type__c],
        model__c: [this.vehicleStock.model_name, Validators.required],
        body_colour__c: [this.vehicleStock.body_colour__c],
        make__c: [this.vehicleStock.make__c],
        first_image_name__c: [this.vehicleStock.first_image_name__c],
        dealer_code__c: [this.vehicleStock.dealer_code__c],
        vehicle_stock_days__c: [this.vehicleStock.vehicle_stock_days__c],
        ownerid: [this.vehicleStock.ownerid],
        egc_price__c: [this.vehicleStock.egc_price__c],
        series_c__c: [this.vehicleStock.series_c__c],
        stock_image__c: [this.vehicleStock.stock_image__c],
        model_name__c: [this.vehicleStock.model_name__c, Validators.required],
        createdbyid: [this.vehicleStock.createdbyid],
        lastmodifiedbyid: [this.vehicleStock.lastmodifiedbyid],
        createddate: [this.vehicleStock.createddate],
        lastmodifieddate: [this.vehicleStock.lastmodifieddate]
      });
      this.vehicleStock.createdbyid = this.vehicleStock.createdbyid
        ? this.vehicleStock.createdbyid
        : this.userData.user_sfid;
      this.vehicleStock.createddate = this.vehicleStock.createddate
        ? this.vehicleStock.createddate
        : "";
      this.vehicleStock.lastmodifiedbyid = this.vehicleStock.lastmodifiedbyid
        ? this.vehicleStock.lastmodifiedbyid
        : "";
      this.vehicleStock.lastmodifieddate = this.vehicleStock.lastmodifieddate
        ? this.vehicleStock.lastmodifieddate
        : "";
    }
  }
  onCloseModal(event: any) {
    this.closeModalEvent.emit(event);
  }

  getSearchModal() {
    this.searchOpen = true;
    this.sdname = "";
  }

  closeSeacrch() {
    this.searchOpen = false;
  }

  modelSearch(term) {
    console.log("term", term);
    if (term != "") {
      this.modelResult = true;
      this.searchLoading = true;
      this.vehicleService
        .search(this.apiSerivice.getModelUrl, term)
        .subscribe(data => {
          this.searchTerm = data.model;
          this.searchLoading = false;
        });
    }
  }
  selectedModel(data) {
    this.vehicleStockForm.controls["model__c"].setValue(data.name);
    this.vehicleStockForm.controls["make__c"].setValue(data.make__c);
    this.vehicleStockForm.controls["model_name__c"].setValue(data.sfid);
    console.log(data);
    this.modelResult = false;
    this.searchOpen = false;
    this.sdname = "";
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.vehicleStockForm);
    delete this.vehicleStockForm.value.model__c;
    if (this.vehicleStockForm.invalid) {
      return;
    }
    if (this.type === "edit") {
      this.vehicleStockForm.value.id = this.vehicleStock.id;
      //this.vehicleStockForm.value.lastmodifiedbyid = this.userData.user_sfid;
    }

    this.send.emit(this.vehicleStockForm.value);
  }
}
