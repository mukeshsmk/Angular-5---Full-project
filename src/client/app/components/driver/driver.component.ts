import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Config from "../../shared/config";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-driver",
  templateUrl: "driver.component.html",
  styleUrls: ["driver.component.css"]
})
export class DriverComponent implements OnInit {
  constructor(private http: HttpClient) {}
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

  ngOnInit() {
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
      .post<{ success: object }>(Config.BASE_URL + "api/relatedDriver", params)
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
}
