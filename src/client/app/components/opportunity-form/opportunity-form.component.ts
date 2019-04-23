import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

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

  submitted = false;

  @Input() opportunity: any;
  @Input() type:any;
  @Output('updateOpportunity') send = new EventEmitter<any>();

  opportunityForm: FormGroup;
 

  constructor(
    private formBuilder: FormBuilder,
  ){
    
  }

  ngOnInit() {
    
    this.opportunityForm = this.formBuilder.group({
      first_name__c: [],
      last_name__c: [ Validators.required],
      company__c: [ Validators.required],
      record_type_name__c_lead: [],
      selling_dealer__c:[],
      source__c: [],
      phone__c: [],
      lead_source__c: [ Validators.required],
      mobile__c: [],
      lead_type__c: [ Validators.required],
      lead_status__c: [],
      email__c: [],
      request_type__c: [ Validators.required],
      stock_number__c: [],
      introduction_to_finance_manager__c: [],
      vehicle_stock__c: [],
      comments_from_stock_c__c: [],
      street__c: [],
      city__c: [],
      state_province__c: [],
      zip_postal_code__c: [],
      previous_customer_name__c: [],
      activity_score__c_lead: [],
      customer_data_completeness_score__c: [],
      currentgenerators__c: [],
      primary__c: [],
      createdbyid: [],
      lastmodifiedbyid: [],
      createddate: [],
      lastmodifieddate: [],
      country__c: []
    });
  }
  ngAfterInit(){
    // fetch data from API for example
    this.opportunityForm.setValue({
      first_name__c: this.opportunity.first_name__c,
      last_name__c: this.opportunity.last_name__c,
      company__c: this.opportunity.company__c,
      record_type_name__c_lead: this.opportunity.record_type_name__c_lead,
      selling_dealer__c:this.opportunity.selling_dealer__c,
      source__c: this.opportunity.source__c,
      phone__c: this.opportunity.phone__c,
      lead_source__c: this.opportunity.lead_source__c,
      mobile__c: this.opportunity.mobile__c,
      lead_type__c: this.opportunity.lead_type__c,
      lead_status__c: this.opportunity.lead_status__c,
      email__c: this.opportunity.email__c,
      request_type__c: this.opportunity.request_type__c,
      stock_number__c: this.opportunity.stock_number__c,
      introduction_to_finance_manager__c: this.opportunity.introduction_to_finance_manager__c,
      vehicle_stock__c: this.opportunity.vehicle_stock__c,
      comments_from_stock_c__c: this.opportunity.comments_from_stock_c__c,
      street__c: this.opportunity.street__c,
      city__c: this.opportunity.city__c,
      state_province__c: this.opportunity.state_province__c,
      zip_postal_code__c: this.opportunity.zip_postal_code__c,
      previous_customer_name__c: this.opportunity.previous_customer_name__c,
      activity_score__c_lead: this.opportunity.activity_score__c_lead,
      customer_data_completeness_score__c: this.opportunity.customer_data_completeness_score__c,
      currentgenerators__c: this.opportunity.currentgenerators__c,
      primary__c: this.opportunity.primary__c,
      createdbyid: this.opportunity.createdbyid,
      lastmodifiedbyid: this.opportunity.lastmodifiedbyid,
      createddate: this.opportunity.createddate,
      lastmodifieddate: this.opportunity.lastmodifieddate,
      country__c: this.opportunity.country__c
    });
  }
  
  onSubmit(){
    console.log(this.opportunityForm)
    // if(this.opportunity.last_name__c == null || this.opportunity.last_name__c.length<0){
    //   this.lastNameErr = true;
    //   return;
    // }
    // if(this.opportunity.company__c == null || this.opportunity.company__c.length<0){
    //   this.companyErr = true;
    //   return;
    // }
    // if(this.opportunity.lead_source__c == null || this.opportunity.lead_source__c.length<0){
    //   this.leadSourceErr = true;
    //   return;
    // }
    // if(this.opportunity.lead_type__c == null || this.opportunity.lead_type__c.length<0){
    //   this.leadTypeerr = true;
    //   return;
    // }
    // if(this.opportunity.request_type__c == null || this.opportunity.request_type__c.length<0){
    //   this.requestTypeerr = true;
    //   return;
    // }
    // this.send.emit(this.opportunity); 
  
    

    if (this.opportunityForm.invalid) {
        return;
    }

    this.send.emit(this.opportunityForm.value); 
}

  
}
