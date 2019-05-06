import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import Config from "../../shared/config";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-customer",
  templateUrl: "customer.component.html",
  styleUrls: ["customer.component.css"]
})
export class CustomerComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  visible1: Boolean = false;
  visible2: Boolean = true;
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
  ddSearch: any = "";
  ddSort: any = "id";

  ahPage: number = 1;
  ahLimit: number = 10;
  ahSearch: any = "";
  ahSort: any = "id";

  @Input() customer: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      name: [""],
      accountid: [""],
      title: [""],
      birthdate: [""],
      record_type: [""],
      do_not_contact__c: [""],
      business_phone__c: [""],
      business_phone_service_type__c: [""],
      business_email_valid__c: [""],
      business_phone_valid__c: [""],
      home_email__c: [""],
      homephone: [""],
      home_phone_service_type__c: [""],
      home_phone_valid__c: [""],
      mobilephone: [""],
      interest_of_make__c: [""],
      billing_address__c: [""],
      billing_suburb__c: [""],
      billing_post_code__c: [""],
      billing_country__c: [""],
      billingdpid__c: [""],
      billing_latitude__c: [""],
      billing_longitude__c: [""],
      first_name__c: ["", Validators.required],
      last_name__c: ["", Validators.required],
      customer_type__c: [""],
      parent_account: [""],
      accountnumber: [""],
      account_record: [""],
      selling_dealer: [""],
      service_dealer: [""],
      customer_type: [""],
      fax: [""],
      phone1__c: [""],
      business_email__c: [""],
      phone1_service_type__c: [""],
      phone1_valid__c: [""],
      email: [""],
      phone2_service_type__c: [""],
      phone2_valid__c: [""],
      web_site: [""],
      phone: [""],
      billing_address: [""],
      billing_subrub: [""],
      billing_state__c: [""],
      billing_postcode__c: [""],
      billing_country: [""],
      billing_dpid: [""],
      billing_lat: [""],
      billing_lng: [""],
      physical_address__c: [""],
      physical_state__c: [""],
      physical_post_code__c: [""],
      physical_country__c: [""],
      physicaldpid__c: [""],
      physical_latitude__c: [""],
      physical_longitude__c: [""],
      license_number__c: [""],
      license_expiry_date__c: [""],
      numberoflocations__c: [""],
      phone2__c: [""]
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
      .post<{ success: object }>(Config.BASE_URL + "api/driverDetails", params)
      .subscribe((response: any) => {
        this.relatedDriverData = response.driver;
        this.loaderOne = false;
      });
  }
  accountHistory(params: any) {
    params.page = params.ahPage;
    this.loaderOne = true;
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/accountHistory", params)
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
}
