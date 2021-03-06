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
  selector: "sd-customer-form",
  templateUrl: "customer-form.component.html",
  styleUrls: ["customer-form.component.css"]
})
export class CustomerFormComponent implements OnInit {
  visibleOne: Boolean = true;
  visibleTwo: Boolean = true;
  visibleThree: Boolean = true;
  visibleFour: Boolean = true;

  @Output() closeModalEvent = new EventEmitter<Boolean>();

  @Input() customer: any;
  @Input() type: any;
  @Output("updateCustomer") send = new EventEmitter<any>();
  userData: any;
  customerForm: FormGroup;
  submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.customer);
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.customerForm = this.formBuilder.group({
      first_name__c: [this.customer.first_name__c, Validators.required],
      last_name__c: [this.customer.last_name__c, Validators.required],
      parent_account: [this.customer.parent_account],
      accountnumber: [this.customer.accountnumber],
      account_record: [this.customer.account_record],
      selling_dealer: [this.customer.selling_dealer],
      service_dealer: [this.customer.service_dealer],
      customer_type: [this.customer.customer_type],
      fax: [this.customer.fax],
      phone1__c: [this.customer.phone1__c],
      business_email__c: [this.customer.business_email__c],
      phone1_service_type__c: [this.customer.phone1_service_type__c],
      phone1_valid__c: [this.customer.phone1_valid__c],
      email: [this.customer.email],
      phone2_service_type__c: [this.customer.phone2_service_type__c],
      phone2_valid__c: [this.customer.phone2_valid__c],
      web_site: [this.customer.web_site],
      phone: [this.customer.phone],
      billing_address: [this.customer.billing_address],
      billing_subrub: [this.customer.billing_subrub],
      billing_state__c: [this.customer.billing_state__c],
      billing_postcode__c: [this.customer.billing_postcode__c],
      billing_country: [this.customer.billing_country],
      billing_dpid: [this.customer.billing_dpid],
      billing_lat: [this.customer.billing_lat],
      billing_lng: [this.customer.billing_lng],
      physical_address__c: [this.customer.physical_address__c],
      physical_state__c: [this.customer.physical_state__c],
      physical_post_code__c: [this.customer.physical_post_code__c],
      physical_country__c: [this.customer.physical_country__c],
      physicaldpid__c: [this.customer.physicaldpid__c],
      physical_latitude__c: [this.customer.physical_latitude__c],
      physical_longitude__c: [this.customer.physical_longitude__c],
      license_number__c: [this.customer.license_number__c],
      license_expiry_date__c: [this.customer.license_expiry_date__c],
      numberoflocations__c: [this.customer.numberoflocations__c],
      phone2__c: [this.customer.phone2__c],
      do_not_contact__c: [this.customer.do_not_contact__c]
    });
    this.customer.createdbyid = this.customer.createdbyid
      ? this.customer.createdbyid
      : this.userData.user_sfid;
    this.customer.createddate = this.customer.createddate
      ? this.customer.createddate
      : "";
    this.customer.lastmodifiedbyid = this.customer.lastmodifiedbyid
      ? this.customer.lastmodifiedbyid
      : "";
    this.customer.lastmodifieddate = this.customer.lastmodifieddate
      ? this.customer.lastmodifieddate
      : "";
  }

  onCloseModal(event: any) {
    this.closeModalEvent.emit(event);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.customerForm);
    delete this.customerForm.value.email;

    if (this.customerForm.invalid) {
      return;
    }
    if (this.type === "edit") {
      this.customerForm.value.id = this.customer.id;
      this.customerForm.value.lastmodifiedbyid = this.userData.user_sfid;
    }

    this.send.emit(this.customerForm.value);
  }
}
