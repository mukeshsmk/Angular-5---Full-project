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
  // visibleSix: Boolean = true;
  // visibleSeven: Boolean = true;

  @Output() closeModalEvent = new EventEmitter<Boolean>();

  submitted = false;
  selected = "Select";
  @Input() opportunity: any;
  @Input() type: any;
  @Output("updateOpportunity") send = new EventEmitter<any>();

  opportunityForm: FormGroup;
  userData: any;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.opportunityForm = this.formBuilder.group({
      first_name__c: [this.opportunity.first_name__c],
      last_name__c: [this.opportunity.last_name__c, Validators.required],
      company__c: [this.opportunity.company__c, Validators.required],
      selling_dealer__c: [this.opportunity.selling_dealer__c],
      source__c: [this.opportunity.source__c],
      phone__c: [this.opportunity.phone__c],
      lead_source__c: [this.opportunity.lead_source__c, Validators.required],
      mobile__c: [this.opportunity.mobile__c],
      lead_type__c: [this.opportunity.lead_type__c, Validators.required],
      lead_status__c: [this.opportunity.lead_status__c],
      email__c: [this.opportunity.email__c],
      request_type__c: [this.opportunity.request_type__c, Validators.required],
      stock_number__c: [this.opportunity.stock_number__c],
      introduction_to_finance_manager__c: [
        this.opportunity.introduction_to_finance_manager__c
      ],
      vehicle_stock__c: [this.opportunity.vehicle_stock__c],
      comments_from_stock__c: [this.opportunity.comments_from_stock__c],
      street__c: [this.opportunity.street__c],
      city__c: [this.opportunity.city__c],
      state_province__c: [this.opportunity.state_province__c],
      zip_postal_code__c: [this.opportunity.zip_postal_code__c],
      previous_customer_name__c: [this.opportunity.previous_customer_name__c],
      activity_score__c: [this.opportunity.activity_score__c],
      customer_data_completeness_score__c: [
        this.opportunity.customer_data_completeness_score__c
      ],
      currentgenerators__c: [this.opportunity.currentgenerators__c],
      primary__c: [this.opportunity.primary__c],
      createdbyid: [this.opportunity.createdbyid],
      lastmodifiedbyid: [this.opportunity.lastmodifiedbyid],
      createddate: [this.opportunity.createddate],
      lastmodifieddate: [this.opportunity.lastmodifieddate],
      country__c: [this.opportunity.company__c],
      app_retail_user__c: [this.userData.user_sfid]
    });
    this.opportunity.createdbyid = this.opportunity.createdbyid
      ? this.opportunity.createdbyid
      : this.userData.user_sfid;
    this.opportunity.createddate = this.opportunity.createddate
      ? this.opportunity.createddate
      : "";
    this.opportunity.lastmodifiedbyid = this.opportunity.lastmodifiedbyid
      ? this.opportunity.lastmodifiedbyid
      : "";
    this.opportunity.lastmodifieddate = this.opportunity.lastmodifieddate
      ? this.opportunity.lastmodifieddate
      : "";
  }

  onCloseModal(event: any) {
    this.closeModalEvent.emit(event);
  }

  onSubmit() {
    console.log(this.opportunityForm);
    this.submitted = true;

    if (this.opportunityForm.invalid) {
      return;
    }
    if (this.type === "edit") {
      this.opportunityForm.value.id = this.opportunity.id;
      this.opportunityForm.value.lastmodifiedbyid = this.userData.user_sfid;
    }
    this.send.emit(this.opportunityForm.value);
  }
}
