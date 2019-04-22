import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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

  lastNameErr:Boolean = false;
  companyErr:Boolean = false;
  leadSourceErr:Boolean = false;
  leadTypeerr:Boolean = false;
  requestTypeerr:Boolean = false;

  @Input() opportunity: any;
  @Input() type:any;
  @Output('update') send = new EventEmitter<any>();

  opportunityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ){
    
  }

  ngOnInit() {
    
  }
  
  onSubmit(){
    if(this.opportunity.last_name__c == null || this.opportunity.last_name__c.length<0){
      this.lastNameErr = true;
      return;
    }
    if(this.opportunity.company__c == null || this.opportunity.company__c.length<0){
      this.companyErr = true;
      return;
    }
    if(this.opportunity.lead_source__c == null || this.opportunity.lead_source__c.length<0){
      this.leadSourceErr = true;
      return;
    }
    if(this.opportunity.lead_type__c == null || this.opportunity.lead_type__c.length<0){
      this.leadTypeerr = true;
      return;
    }
    if(this.opportunity.request_type__c == null || this.opportunity.request_type__c.length<0){
      this.requestTypeerr = true;
      return;
    }
    this.send.emit(this.opportunity); 
  }
  
}
