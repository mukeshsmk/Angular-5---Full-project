import { Component, ViewChild,Output,EventEmitter } from "@angular/core";

import { TabsComponent } from "../tab/tabs.component";
import { HttpClient } from "@angular/common/http";
import { GeneralService } from "../../shared/services/GeneralService";
import Config from "../../shared/config";

@Component({
  moduleId: module.id,
  selector: "sd-table-list",
  templateUrl: "table-list.component.html",
  styleUrls: ["table-list.component.css"]
})
export class TableListComponent {
  p: number = 1;

  @ViewChild(TabsComponent) tabsComponent: any;
  @ViewChild("personDetails") persondetailsTemplate: any;
  @ViewChild("stockDetails") stockdetailsTemplate: any;
  @ViewChild("driverDetails") driverdetailsTemplate: any;
  @ViewChild("customerDetails") customerdetailsTemplate: any;
  @ViewChild("oppournityModal") oppournitymodalTemplate: any;
  loaderOne: Boolean = false;
  opportunityList: any = [];
  module: string = "opportunities";
  opportunityListData: any = [];
  page: number = 1;
  limit: number = 10;
  search: any = "";
  showEdit: boolean = false;
  opportunityOpen: boolean = true;
  vehicleStock : boolean = false;
  modalData: any = [];
  formType: any;
  responseData:any;
  permission:any;
  vsType:any='';
  userData:any;
  sort:any='id';

  searchTerm: string;
  constructor(private http: HttpClient, public generalService: GeneralService) {
    this.permission = {
      "create_permission": 0,
      "edit_permission": 0,
      "delete_permission": 0,
    }
    let params = {
      page: this.page,
      limit: this.limit,
      search: this.search,
      type:this.vsType,
      sort:this.sort
    };
    this.generalService.emitter.subscribe((response: string) => {
      this.module = response;
      this.loadData(this.module, params);
      console.log("Loading data", this.module);
    });
    this.loadData(this.module, params);
    this.userData = JSON.parse(localStorage.getItem("user_data"))
  } 

   onClose(event: any){
     console.log(event)
     this.closeModal();
   }

  refresh() {
    let params = {
      page: this.page,
      limit: this.limit,
      search: this.search,
      type:this.vsType,
      sort:this.sort
    };
    this.loadData(this.module, params);
  }
  loadData(type: string, params: any) {
    this.loaderOne = true;
    // params =
    //   "page=" +
    //   params.page +
    //   "&limit=" +
    //   params.limit +
    //   "&search=" +
    //   params.search;
    params.userData = JSON.parse(localStorage.getItem("user_data"));
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/" + type , params)
      .subscribe((response: any) => {
        this.responseData = response;
        this.opportunityListData = response.list;
        if (type == 'opportunities') {
          for (var i = 0; i < response.list.data.length; i++) {
            if (this.responseData.sfid[this.opportunityListData.data[i].app_retail_user__c] != undefined) {
              response.list.data[i].lead_owner_data = this.responseData.sfid[this.opportunityListData.data[i].app_retail_user__c];
            } else {
              response.list.data[i].lead_owner_data = '-';
            }
          }
          this.permission = response.permission[0];
        }       
        this.opportunityListData.lastPage = Array(
          this.opportunityListData.last_page
        )
          .fill(1)
          .map((x, i) => i);
        this.opportunityList = response.list.data;
        this.loaderOne = false;
      });
  }
  searchList(searchData: any) {
    if (searchData.length >= 3 || searchData.length == 0) {
      this.search = searchData;
      let params = {
        page: 1,
        limit: this.limit,
        search: this.search,
        type:this.vsType,
        sort:this.sort
      };
      this.loadData(this.module, params);
    }
  }
  pageCount(limit: any) {
    this.limit = limit;
    let params = {
      page: 1,
      limit: this.limit,
      search: this.search,
      type:this.vsType,
      sort:this.sort
    };

    this.loadData(this.module, params);
  }
  pageNumber(page: any) {
    this.page = page;
    let params = {
      page: this.page,
      limit: this.limit,
      search: this.search,
      type:this.vsType,
      sort:this.sort
    };
    this.loadData(this.module, params);
  }
  vehicleStockType(type:any ){
    this.vsType = type;
    let params = {
      page: 1,
      limit: this.limit,
      search: this.search,
      type:this.vsType,
      sort:this.sort
    };
    this.loadData(this.module, params);
  }
  activateClass(i: any) {
    i.active = !i.current_page;
  }
  sortData(sort: any) {
    this.sort = sort;
    let params = {
      page: 1,
      limit: this.limit,
      search: this.search,
      type:this.vsType,
      sort:this.sort
    };
    this.loadData(this.module, params);
  }
  viewPersondetails(data: any) {
    this.loaderOne = true;
    let template;
    switch (this.module) {
      case "opportunities":
        template = this.persondetailsTemplate;
        break;
      case "vehicle_stocks":
        template = this.stockdetailsTemplate;
        break;
      case "drivers":
        template = this.driverdetailsTemplate;
        break;
      case "customers":
        template = this.customerdetailsTemplate;
        break;
    }
    console.log(data);
    this.tabsComponent.openTab(
      data.name,
      template,
      data,
      true,
      this.module + "-" + data.id
    );
    this.loaderOne = false;
  }

  //opportunity modal
  openOpportunityModal(data: any) {
    console.log(data);
    this.modalData = data;
    this.formType = "edit";
    this.opportunityOpen = false;
  }
  openNewOpportunityModal() {
    this.formType = "new";
    this.opportunityOpen = false;
  }
  closeModal() {
    this.opportunityOpen = true;
    this.modalData = [];
  }
  updateOpportunity(event: any) {
    console.log(JSON.stringify(event));
    let endpoint: any;
    if (this.formType == "edit") {
      endpoint = "leadUpdate";
    }
    if (this.formType == "new") {
      endpoint = "quickLeadInsert";
      //event = JSON.stringify(event)
    }

    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/" + endpoint, event)
      .subscribe((response: any) => {
        console.log(response);
        this.opportunityOpen = true;
        this.modalData = [];
      });
  }
  //vehicleStock Modal
  updatevehicleStockModal(data: any) {
    this.modalData = data;
    this.formType = "edit";
    this.opportunityOpen = false;
  }
  updatevehicleStock(event: any) {
    console.log(event);
    let endpoint: any;
    if (this.formType == "edit") {
      endpoint = "vehicle_stockUpdate";
    }
    if (this.formType == "new") {
      //endpoint = 'createCustomer';
    }
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/" + endpoint, event)
      .subscribe((response: any) => {
        console.log(response);
        this.opportunityOpen = true;
        this.modalData = [];
      });
  }
  //Driver modal
  updateDriverModal(data: any) {
    this.modalData = data;
    this.formType = "edit";
    this.opportunityOpen = false;
  }
  updateDriver(event: any) {
    console.log(event);
    let endpoint: any;
    if (this.formType == "edit") {
      endpoint = "driverUpdate";
    }
    if (this.formType == "new") {
      //endpoint = 'createCustomer';
    }
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/" + endpoint, event)
      .subscribe((response: any) => {
        console.log(response);
        this.opportunityOpen = true;
        this.modalData = [];
      });
  }
  //customer modal
  openNewCustomerModal() {
    this.formType = "new";
    this.opportunityOpen = false;
  }
  updateCustomerModal(data: any) {
    this.modalData = data;
    this.formType = "edit";
    this.opportunityOpen = false;
  }
  updateCustomer(event: any) {
    let endpoint: any;
    if (this.formType == "edit") {
      endpoint = "customerUpdate";
    }
    if (this.formType == "new") {
      endpoint = "createCustomer";
    }
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/" + endpoint, event)
      .subscribe((response: any) => {
        console.log(response);
        this.opportunityOpen = true;
        this.modalData = [];
      });
  }
  
  //https://stackblitz.com/edit/angular-dynamic-tabs?file=app%2Fpeople%2Fperson-edit.component.ts
}
