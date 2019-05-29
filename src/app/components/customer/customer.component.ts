import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Config from '../../shared/config';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: 'sd-customer',
  templateUrl: 'customer.component.html',
  styleUrls: [ 'customer.component.css' ]
})
export class CustomerComponent implements OnInit {
  driver: any = {};
  submitted: Boolean = false;
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  visible_One: Boolean = true;
  visible_Two: Boolean = true;
  visible_Three: Boolean = true;
  visible_Four: Boolean = true;
  visible_Five: Boolean = true;

  visible1: Boolean = false;
  visible2: Boolean = false;
  visible3: Boolean = true;

  visibleDetail: Boolean = true;
  visibleRelated: Boolean = false;

  newcaseOpen: Boolean = false;
  newdriverOpen: Boolean = false;

  customerForm: FormGroup;
  customerdata: any;

  loaderOne: Boolean = false;
  relatedDriverData: any = [];
  relatedHistoryData: any = [];

  ddPage: number = 1;
  ddLimit: number = 10;
  ddSearch: any = '';
  ddSort: any = 'id';

  ahPage: number = 1;
  ahLimit: number = 10;
  ahSearch: any = '';
  ahSort: any = 'id';

  userData: any;
  @Input() customer: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    this.customerForm = this.formBuilder.group({
      name: [ this.driver.name, Validators.required ],
      parent_account: [ this.driver.parent_account ],
      accountid: [ this.driver.accountid ],
      title: [ this.driver.title ],
      birthdate: [ this.driver.birthdate ],
      customer_type__c: [ this.driver.customer_type__c ],
      record_type: [ this.driver.record_type ],
      selling_dealer: [ this.driver.selling_dealer ],
      service_dealer: [ this.driver.service_dealer ],
      customer_type: [ this.driver.customer_type ],
      do_not_contact__c: [ this.driver.do_not_contact__c ],
      fax: [ this.driver.fax ],
      business_phone__c: [ this.driver.business_phone__c ],
      business_email__c: [ this.driver.business_email__c ],
      business_phone_service_type__c: [
        this.driver.business_phone_service_type__c
      ],
      business_email_valid__c: [ this.driver.business_email_valid__c ],
      business_phone_valid__c: [ this.driver.business_phone_valid__c ],
      home_email__c: [ this.driver.home_email__c ],
      homephone: [ this.driver.homephone ],
      home_phone_service_type__c: [ this.driver.home_phone_service_type__c ],
      home_phone_valid__c: [ this.driver.home_phone_valid__c ],
      email: [ this.driver.email ],
      mobilephone: [ this.driver.mobilephone ],
      interest_of_make__c: [ this.driver.interest_of_make__c ],
      billing_address__c: [ this.driver.billing_address__c ],
      billing_suburb__c: [ this.driver.billing_suburb__c ],
      billing_state__c: [ this.driver.billing_state__c ],
      billing_post_code__c: [ this.driver.billing_post_code__c ],
      billing_country__c: [ this.driver.billing_country__c ],
      billingdpid__c: [ this.driver.billingdpid__c ],
      billing_latitude__c: [ this.driver.billing_latitude__c ],
      billing_longitude__c: [ this.driver.billing_longitude__c ]
    });
    const params = {
      ddPage: this.ddPage,
      ddLimit: this.ddLimit,
      ddSearch: this.ddSearch,
      ddSort: this.ddSort,
      ahPage: this.ahPage,
      ahLimit: this.ahLimit,
      ahSearch: this.ahSearch,
      ahSort: this.ahSort,
      id: this.customer.id
    };
    this.driverDetails(params);
    this.accountHistory(params);
  }
  driverDetails(params: any) {
    params.page = params.ddPage;
    this.loaderOne = true;
    this.http
      .post<{ success: object }>(Config.BASE_URL + 'api/driverDetails', params)
      .subscribe((response: any) => {
        this.relatedDriverData = response.driver;
        this.loaderOne = false;
      });
  }
  accountHistory(params: any) {
    params.page = params.ahPage;
    this.loaderOne = true;
    this.http
      .post<{ success: object }>(Config.BASE_URL + 'api/accountHistory', params)
      .subscribe((response: any) => {
        this.relatedHistoryData = response.accounthistory;
        this.loaderOne = false;
      });
  }
  ddSortData(sort: any) {
    this.ddSort = sort;
    const params = {
      ddPage: this.ddPage,
      ddLimit: this.ddLimit,
      ddSearch: this.ddSearch,
      ddSort: this.ddSort,
      ahPage: this.ahPage,
      ahLimit: this.ahLimit,
      ahSearch: this.ahSearch,
      ahSort: this.ahSort,
      id: this.customer.id
    };
    this.driverDetails(params);
  }
  ddSearchList(searchData: any) {
    if (searchData.length >= 3 || searchData.length === 0) {
      this.ddSearch = searchData;
      const params = {
        ddPage: 1,
        ddLimit: this.ddLimit,
        ddSearch: this.ddSearch,
        ddSort: this.ddSort,
        ahPage: this.ahPage,
        ahLimit: this.ahLimit,
        ahSearch: this.ahSearch,
        ahSort: this.ahSort,
        id: this.customer.id
      };
      this.driverDetails(params);
    }
  }
  ddPageCount(limit: any) {
    this.ddLimit = limit;
    const params = {
      ddPage: 1,
      ddLimit: this.ddLimit,
      ddSearch: this.ddSearch,
      ddSort: this.ddSort,
      ahPage: 1,
      ahLimit: this.ahLimit,
      ahSearch: this.ahSearch,
      ahSort: this.ahSort,
      id: this.customer.id
    };

    this.driverDetails(params);
  }
  ddPageNumber(page: any) {
    if (page >= 1 && page <= this.relatedDriverData.last_page) {
      this.ddPage = page;
      const params = {
        ddPage: this.ddPage,
        ddLimit: this.ddLimit,
        ddSearch: this.ddSearch,
        ddSort: this.ddSort,
        ahPage: this.ahPage,
        ahLimit: this.ahLimit,
        ahSearch: this.ahSearch,
        ahSort: this.ahSort,
        id: this.customer.id
      };
      this.driverDetails(params);
    }
  }
  ahSortData(sort: any) {
    this.ddSort = sort;
    const params = {
      ddPage: this.ddPage,
      ddLimit: this.ddLimit,
      ddSearch: this.ddSearch,
      ddSort: this.ddSort,
      ahPage: this.ahPage,
      ahLimit: this.ahLimit,
      ahSearch: this.ahSearch,
      ahSort: this.ahSort,
      id: this.customer.id
    };
    this.accountHistory(params);
  }
  ahSearchList(searchData: any) {
    if (searchData.length >= 3 || searchData.length === 0) {
      this.ahSearch = searchData;
      const params = {
        ddPage: 1,
        ddLimit: this.ddLimit,
        ddSearch: this.ddSearch,
        ddSort: this.ddSort,
        ahPage: this.ahPage,
        ahLimit: this.ahLimit,
        ahSearch: this.ahSearch,
        ahSort: this.ahSort,
        id: this.customer.id
      };
      this.accountHistory(params);
    }
  }
  ahPageCount(limit: any) {
    this.ahLimit = limit;
    const params = {
      ddPage: 1,
      ddLimit: this.ddLimit,
      ddSearch: this.ddSearch,
      ddSort: this.ddSort,
      ahPage: 1,
      ahLimit: this.ahLimit,
      ahSearch: this.ahSearch,
      ahSort: this.ahSort,
      id: this.customer.id
    };

    this.accountHistory(params);
  }
  ahPageNumber(page: any) {
    if (page >= 1 && page <= this.relatedDriverData.last_page) {
      this.ahPage = page;
      const params = {
        ddPage: this.ddPage,
        ddLimit: this.ddLimit,
        ddSearch: this.ddSearch,
        ddSort: this.ddSort,
        ahPage: this.ahPage,
        ahLimit: this.ahLimit,
        ahSearch: this.ahSearch,
        ahSort: this.ahSort,
        id: this.customer.id
      };
      this.accountHistory(params);
    }
  }
  addnewCase() {
    this.newcaseOpen = true;
  }
  addnewDriver() {
    this.newdriverOpen = true;
  }
  close() {
    this.newcaseOpen = false;
    this.newdriverOpen = false;
  }
  viewDetail() {
    this.visibleDetail = true;
    this.visibleRelated = false;
  }
  viewRelated() {
    this.visibleDetail = false;
    this.visibleRelated = true;
  }
  onSubmit(form: any) {
    this.submitted = true;
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    this.http
      .post<{ success: object }>(
        Config.BASE_URL + 'api/createDriver',
        form.value
      )
      .subscribe((response: any) => {
        console.log(response);
        this.close();
      });
  }
}
