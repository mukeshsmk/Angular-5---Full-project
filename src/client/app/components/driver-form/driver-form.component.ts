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
  selector: "sd-driver-form",
  templateUrl: "driver-form.component.html",
  styleUrls: ["driver-form.component.css"]
})
export class DriverFormComponent implements OnInit {
  visibleOne: Boolean = true;
  visibleTwo: Boolean = true;
  visibleThree: Boolean = true;
  visibleFour: Boolean = true;
  visibleFive: Boolean = true;
  visibleSix: Boolean = true;
  visibleSeven: Boolean = true;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  @Input() driver: any;
  @Input() type: any;
  @Output("updateDriver") send = new EventEmitter<any>();

  driverForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      name: [this.driver.name, Validators.required],
      parent_account: [this.driver.parent_account],
      accountid: [this.driver.accountid],
      title: [this.driver.title],
      birthdate: [this.driver.birthdate],
      customer_type__c: [this.driver.customer_type__c],
      record_type: [this.driver.record_type],
      selling_dealer: [this.driver.selling_dealer],
      service_dealer: [this.driver.service_dealer],
      customer_type: [this.driver.customer_type],
      do_not_contact__c: [this.driver.do_not_contact__c],
      fax: [this.driver.fax],
      business_phone__c: [this.driver.business_phone__c],
      business_email__c: [this.driver.business_email__c],
      business_phone_service_type__c: [
        this.driver.business_phone_service_type__c
      ],
      business_email_valid__c: [this.driver.business_email_valid__c],
      business_phone_valid__c: [this.driver.business_phone_valid__c],
      home_email__c: [this.driver.home_email__c],
      homephone: [this.driver.homephone],
      home_phone_service_type__c: [this.driver.home_phone_service_type__c],
      home_phone_valid__c: [this.driver.home_phone_valid__c],
      email: [this.driver.email],
      mobilephone: [this.driver.mobilephone],
      interest_of_make__c: [this.driver.interest_of_make__c],
      billing_address__c: [this.driver.billing_address__c],
      billing_suburb__c: [this.driver.billing_suburb__c],
      billing_state__c: [this.driver.billing_state__c],
      billing_post_code__c: [this.driver.billing_post_code__c],
      billing_country__c: [this.driver.billing_country__c],
      billingdpid__c: [this.driver.billingdpid__c],
      billing_latitude__c: [this.driver.billing_latitude__c],
      billing_longitude__c: [this.driver.billing_longitude__c]
    });
    console.log(this.driver);
  }
  
  onCloseModal(event: any){
    this.closeModalEvent.emit(event);  
   }
   
  onSubmit(){
    this.submitted = true;
    console.log(this.driverForm);

    if (this.driverForm.invalid) {
      return;
    }
    if (this.type == "edit") {
      this.driverForm.value.id = this.driver.id;
    }

    this.send.emit(this.driverForm.value);
  }
  closeOpportunityModal() {}
}
