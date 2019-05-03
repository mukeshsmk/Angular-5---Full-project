import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.css']
})
export class CustomerComponent implements OnInit{
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  visible1: Boolean = false;
  visible2: Boolean = true;
  visible3: Boolean = true;

  visibleDetail: Boolean = true;
  visibleRelated: Boolean = false;

  newcaseOpen:Boolean = false;
  newdriverOpen:Boolean = false;

  customerForm: FormGroup;
  customerdata:any;

  @Input() customer: any;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(){
    this.customerForm = this.formBuilder.group({
      name:[''],
      accountid:[''],
      title:[''],
      birthdate:[''],
      record_type:[''],
      do_not_contact__c:[''],
      business_phone__c:[''],
      business_phone_service_type__c:[''],
      business_email_valid__c:[''],
      business_phone_valid__c:[''],
      home_email__c:[''],
      homephone:[''],
      home_phone_service_type__c:[''],
      home_phone_valid__c:[''],
      mobilephone:[''],
      interest_of_make__c:[''],
      billing_address__c:[''],
      billing_suburb__c:[''],
      billing_post_code__c:[''],
      billing_country__c:[''],
      billingdpid__c:[''],
      billing_latitude__c:[''],
      billing_longitude__c:[''],
      first_name__c: ['', Validators.required],
      last_name__c: ['', Validators.required],
      customer_type__c:[''],
      parent_account: [''],
      accountnumber: [''],
      account_record: [''],
      selling_dealer: [''],
      service_dealer: [''],
      customer_type: [''],
      fax: [''],
      phone1__c: [''],
      business_email__c: [''],
      phone1_service_type__c: [''],
      phone1_valid__c: [''],
      email: [''],
      phone2_service_type__c: [''],
      phone2_valid__c: [''],
      web_site: [''],
      phone: [''],
      billing_address: [''],
      billing_subrub: [''],
      billing_state__c: [''],
      billing_postcode__c: [''],
      billing_country: [''],
      billing_dpid: [''],
      billing_lat: [''],
      billing_lng: [''],
      physical_address__c: [''],
      physical_state__c: [''],
      physical_post_code__c: [''],
      physical_country__c: [''],
      physicaldpid__c: [''],
      physical_latitude__c: [''],
      physical_longitude__c: [''],
      license_number__c: [''],
      license_expiry_date__c: [''],
      numberoflocations__c: [''],
      phone2__c: ['']
    });
  }
  addnewCase(){
    this.newcaseOpen = true;
  }
  addnewDriver(){
    this.newdriverOpen = true;
  }
  close(){
    this.newcaseOpen = false;
    this.newdriverOpen = false;
  }
  viewDetail(){
    this.visibleDetail = true;
    this.visibleRelated = false;
  }
  viewRelated(){
    this.visibleDetail = false;
    this.visibleRelated = true;
  }

}
