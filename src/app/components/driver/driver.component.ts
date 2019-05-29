import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { ApiService } from "../../shared/services/ApiServices";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  selector: "sd-driver",
  templateUrl: "driver.component.html",
  styleUrls: ["driver.component.css"]
})
export class DriverComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public apiService: ApiService
  ) {}
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  visibleDetail: Boolean = true;
  visibleRelated: Boolean = false;

  newcaseOpen: Boolean = false;
  campaignOpen: Boolean = false;
  attachmentOpen: Boolean = false;
  loaderOne: Boolean = false;
  relatedListData: any = [];

  casePage: number = 1;
  caseLimit: number = 10;
  caseSearch: any = "";
  caseSort: any = "id";

  page: number = 1;
  chLimit: number = 10;
  chSearch: any = "";
  chSort: any = "id";

  contactHisPage: number = 1;
  contactHisLimit: number = 10;
  contactHisSearch: any = "";
  contactHisSort: any = "id";

  @Input() driver: any;
  userData: any;
  campaignForm: FormGroup;
  submitted: Boolean = false;
  insertCampaignSuccess: Boolean = false;

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.campaignForm = this.formBuilder.group({
      contactid: [this.driver.sfid],
      status: [""],
      name: [""],
      campaignmemberstatus: [""],
      campaign_name__c: [""],
      lead: [""],
      type: ["Lead"],
      comments__c: [""],
      request_type__c: [""],
      vin__c: [""],
      comments_from_stock_c__c: [""]
    });
    const params = {
      casePage: this.casePage,
      caseLimit: this.caseLimit,
      caseSearch: this.caseSearch,
      caseSort: this.caseSort,
      page: this.page,
      chLimit: this.chLimit,
      chSearch: this.chSearch,
      chSort: this.chSort,
      contactHisPage: this.contactHisPage,
      contactHisLimit: this.contactHisLimit,
      contactHisSearch: this.contactHisSearch,
      contactHisSort: this.contactHisSort,
      id: this.driver.id
    };
    this.relatedDriver(params);
  }

  relatedDriver(params: any) {
    this.loaderOne = true;
    this.http
      .post<{ success: object }>(this.apiService.relatedDriverUrl, params)
      .subscribe((response: any) => {
        this.relatedListData = response;
        this.loaderOne = false;
      });
  }
  chSortData(sort: any) {
    this.chSort = sort;
    const params = {
      casePage: this.casePage,
      caseLimit: this.caseLimit,
      caseSearch: this.caseSearch,
      caseSort: this.caseSort,
      page: this.page,
      chLimit: this.chLimit,
      chSearch: this.chSearch,
      chSort: this.chSort,
      contactHisPage: this.contactHisPage,
      contactHisLimit: this.contactHisLimit,
      contactHisSearch: this.contactHisSearch,
      contactHisSort: this.contactHisSort,
      id: this.driver.id
    };
    this.relatedDriver(params);
  }
  chSearchList(searchData: any) {
    if (searchData.length >= 3 || searchData.length === 0) {
      this.chSearch = searchData;
      const params = {
        casePage: this.casePage,
        caseLimit: this.caseLimit,
        caseSearch: this.caseSearch,
        caseSort: this.caseSort,
        page: this.page,
        chLimit: this.chLimit,
        chSearch: this.chSearch,
        chSort: this.chSort,
        contactHisPage: this.contactHisPage,
        contactHisLimit: this.contactHisLimit,
        contactHisSearch: this.contactHisSearch,
        contactHisSort: this.contactHisSort,
        id: this.driver.id
      };
      this.relatedDriver(params);
    }
  }
  chPageCount(limit: any) {
    this.chLimit = limit;
    const params = {
      casePage: this.casePage,
      caseLimit: this.caseLimit,
      caseSearch: this.caseSearch,
      caseSort: this.caseSort,
      page: 1,
      chLimit: this.chLimit,
      chSearch: this.chSearch,
      chSort: this.chSort,
      contactHisPage: this.contactHisPage,
      contactHisLimit: this.contactHisLimit,
      contactHisSearch: this.contactHisSearch,
      contactHisSort: this.contactHisSort,
      id: this.driver.id
    };

    this.relatedDriver(params);
  }
  chPageNumber(page: any) {
    if (page >= 1 && page <= this.relatedListData.campaign.last_page) {
      this.page = page;
      const params = {
        casePage: this.casePage,
        caseLimit: this.caseLimit,
        caseSearch: this.caseSearch,
        caseSort: this.caseSort,
        page: this.page,
        chLimit: this.chLimit,
        chSearch: this.chSearch,
        chSort: this.chSort,
        contactHisPage: this.contactHisPage,
        contactHisLimit: this.contactHisLimit,
        contactHisSearch: this.contactHisSearch,
        contactHisSort: this.contactHisSort,
        id: this.driver.id
      };
      this.relatedDriver(params);
    }
  }

  addnewCase() {
    this.newcaseOpen = true;
  }
  addcampaign() {
    this.campaignOpen = true;
  }
  addAttachment() {
    this.attachmentOpen = true;
  }
  close() {
    this.newcaseOpen = false;
    this.campaignOpen = false;
    this.attachmentOpen = false;
  }
  viewDetail() {
    this.visibleDetail = true;
    this.visibleRelated = false;
  }
  viewRelated() {
    this.visibleDetail = false;
    this.visibleRelated = true;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.campaignForm);

    if (this.campaignForm.invalid) {
      return;
    }
    this.loaderOne = true;
    this.http
      .post<{ success: object }>(
        this.apiService.createCampaignUrl,
        this.campaignForm.value
      )
      .subscribe((response: any) => {
        this.loaderOne = false;
        this.insertCampaignSuccess = true;
        this.campaignForm.reset();
        this.submitted = false;
      });
  }
}
