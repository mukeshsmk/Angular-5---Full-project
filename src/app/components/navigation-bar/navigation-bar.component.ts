import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { GeneralService } from "../../shared/services/GeneralService";
import { ApiService } from "../../shared/services/ApiServices";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sd-navigation-bar",
  templateUrl: "navigation-bar.component.html",
  styleUrls: ["navigation-bar.component.css"]
})
export class NavigationBarComponent implements OnInit {
  module: string;
  navigtionOpen: Boolean = false;
  submitted = false;
  colorIndex: any = 0;
  stageName: any = [];
  loaderOne: Boolean = false;

  @Input() details: any;
  newTaskForm: FormGroup;
  appointmentTaskForm: FormGroup;
  quotationTaskForm: FormGroup;
  negotiationTaskForm: FormGroup;
  closedLostTaskForm: FormGroup;
  closedWonTaskForm: FormGroup;
  duplicateTaskForm: FormGroup;
  convertesTaskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public generalService: GeneralService,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.stageName = [
      "new",
      "Working",
      "Appointment",
      "Quotation",
      "Negotiation",
      "Finalize",
      "ClosedLost",
      "ClosedWon",
      "Duplicate",
      "Converted"
    ];
    this.formData();
  }
  formData(){
    if (this.details) {
      this.newTaskForm = this.formBuilder.group({
        first_name__c: [this.details.first_name__c],
        last_name__c: [this.details.last_name__c],
        mobile__c: [this.details.mobile__c],
        email__c: [this.details.email__c],
        zip_postal_code__c: [this.details.zip_postal_code__c],
        stagename: ["Working"]
      });
      this.appointmentTaskForm = this.formBuilder.group({
        license_number__c: [this.details.license_number__c],
        stagename: ["Appointment"]
      });
      this.quotationTaskForm = this.formBuilder.group({
        family_details__c: [this.details.family_details__c],
        place_of_work__c: [this.details.place_of_work__c],
        stagename: ["Quotation"]
      });
      this.negotiationTaskForm = this.formBuilder.group({
        introduction_to_finance_manager__c: [
          this.details.introduction_to_finance_manager__c
        ],
        stagename: ["Negotiation"]
      });
      this.closedLostTaskForm = this.formBuilder.group({
        notes__c: [this.details.notes__c],
        stagename: ["ClosedLost"]
      });
      this.closedWonTaskForm = this.formBuilder.group({
        vin_number__c: [this.details.vin_number__c],
        stock_number__c: [this.details.stock_number__c],
        mobile__c: [this.details.mobile__c],
        stagename: ["ClosedWon"]
      });
      this.duplicateTaskForm = this.formBuilder.group({
        notes__c: [this.details.notes__c],
        stagename: ["Duplicate"]
      });
      this.convertesTaskForm = this.formBuilder.group({
        notes__c: [this.details.notes__c],
        stagename: ["Converted"]
      });
      this.navCompleted();
    }
  }

  navCompleted() {
    this.loaderOne = true;
    let data = {
      lead_id: this.details.id
    };
    this.http
      .post<{ success: object }>(this.apiService.leadEditFetchUrl, data)
      .subscribe((response: any) => {
        if (!response.error) {
          this.details = response;
          this.navStatusChange();
          this.formData();
        }
        this.loaderOne = false;
      });
  }
  navStatusChange() {
    for (let i = 0; i < this.stageName.length; i++) {
      if (this.details.stagename === this.stageName[i]) {
        this.colorIndex = i;
      }
    }
  }
  openNavModal(arg: string) {
    this.module = arg;
    this.navigtionOpen = true;
  }
  closeModal() {
    this.navigtionOpen = false;
  }

  onSubmit(form: any) {
    this.loaderOne = true;
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    form.value.id = this.details.id;
    this.loaderOne = false;
    this.updateData(form.value, this.apiService.updateStageUrl("updateStage"));
  }
  updateData(data: any, endpoint: any) {
    this.loaderOne = true;
    this.http
      .post<{ success: object }>(endpoint, data)
      .subscribe((response: any) => {
        console.log(response);
        this.details = response;
        this.loaderOne = false;
        this.navStatusChange();
        this.closeModal();
      });
  }
  updateFinalize() {
    const finalizeData = {
      id: this.details.id,
      stagename: "Finalize"
    };
    this.updateData(
      finalizeData,
      this.apiService.updateStageUrl("updateStage")
    );
  }
}
