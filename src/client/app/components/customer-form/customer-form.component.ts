import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
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
 
  @Input() customer: any;
  @Input() type:any;
  @Output('updateCustomer') send = new EventEmitter<any>();

  customerForm: FormGroup;
  submitted:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ){
    
  }

  ngOnInit() {
    
    this.customerForm = this.formBuilder.group({
      first_name__c: ['',Validators.required],
      last_name__c: ['',Validators.required],
      parent_account:[''],
      accountnumber:[''],
      account_record:[''],
      selling_dealer:[''],
      service_dealer:[''],
      customer_type:[''],
      fax:[''],
      phone1__c:[''],
      business_email__c:[''],
      phone1_service_type__c:[''],
      phone1_valid__c:[''],
      email:[''],
      phone2_service_type__c:[''],
      phone2_valid__c:[''],
      web_site:[''],
      phone:[''],
      billing_address:[''],
      billing_subrub:[''],
      billing_state__c:[''],
      billing_postcode__c:[''],
      billing_country:[''],
      billing_dpid:[''],
      billing_lat:[''],
      billing_lng:[''],
      physical_address__c:[''],
      physical_state__c:[''],
      physical_post_code__c:[''],
      physical_country__c:[''],
      physicaldpid__c:[''],
      physical_latitude__c:[''],
      physical_longitude__c:[''],
      license_number__c:[''],
      license_expiry_date__c:[''],
      numberoflocations__c:[''],
      phone2__c:['']
    });
  }
  onSubmit(){
    this.submitted = true;
    console.log(this.customerForm)

    if (this.customerForm.invalid) {
        return;
    }

    //this.send.emit(this.customerForm.value); 
}

}
