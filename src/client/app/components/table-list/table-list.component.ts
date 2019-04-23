import { Component, ViewChild } from "@angular/core";

import { TabsComponent } from "../tab/tabs.component";
import { HttpClient } from "@angular/common/http";
import GeneralService from "../../shared/services/GeneralService";
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

  opportunityList: any = [];
  module: string = "opportunities";
  opportunityListData: any = [];
  page: number = 1;
  limit: number = 10;
  search: any = "";
  showEdit: boolean = false;
  opportunityOpen:boolean = true;
  modalData: any=[];
  formType:any;

  searchTerm: string;
  constructor(private http: HttpClient, public generalService: GeneralService) {
    let params = {
      page: this.page,
      limit: this.limit,
      search: this.search
    };
    this.generalService.emitter.subscribe((response: string) => {
      this.module = response;
      this.loadData(this.module, params);
      console.log("Loading data", this.module);
    });
    this.loadData(this.module, params);
  }

  loadData(type: string, params: any) {
    params =
      "page=" +
      params.page +
      "&limit=" +
      params.limit +
      "&search=" +
      params.search;
    this.http
      .get<{ success: object }>(Config.BASE_URL + "api/" + type + "?" + params)
      .subscribe((response: any) => {
        this.opportunityListData = response;
        this.opportunityListData.last_page = Array(
          this.opportunityListData.last_page
        )
          .fill(1)
          .map((x, i) => i);
        this.opportunityList = response.data;
      });
  }
  searchList(searchData: any) {
    if (searchData.length >= 3 || searchData.length == 0) {
      this.search = searchData;
      let params = {
        page: 1,
        limit: this.limit,
        search: this.search
      };
      this.loadData(this.module, params);
    }
  }
  pageCount(limit: any) {
    this.limit = limit;
    let params = {
      page: 1,
      limit: this.limit,
      search: this.search
    };

    this.loadData(this.module, params);
  }
  pageNumber(page: any) {
    this.page = page;
    let params = {
      page: this.page,
      limit: this.limit,
      search: this.search
    };
    this.loadData(this.module, params);
  }
  activateClass(i: any) {
    i.active = !i.current_page;
  }
  sort(arg: any) {
    switch (arg) {
      case "name":
        this.opportunityList = this.opportunityList.sort(function(
          a: any,
          b: any
        ) {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        break;
      case "company":
        this.opportunityList = this.opportunityList.sort(function(a: any, b: any) {
          var x = a.company__c.toLowerCase();
          var y = b.company__c.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        break;
      case "phone":
        this.opportunityList = this.opportunityList.sort(function(a: any, b: any) {
          var x = a.phone__c;
          var y = b.phone__c;
          return x - y;
        });
        break;
      case "email":
        this.opportunityList = this.opportunityList.sort(function(a: any, b: any) {
          var x = a.email__c.toLowerCase();
          var y = b.email__c.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        break;
      case "leadowner":
        this.opportunityList = this.opportunityList.sort(function(a: any, b: any) {
          var x = a.leadowner.toLowerCase();
          var y = b.leadowner.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        break;
      case "id":
        this.opportunityList = this.opportunityList.sort(function(a: any, b: any) {
          var x = a.id;
          var y = b.id;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        break;
    }
  }
  viewPersondetails(data: any) {
    console.log(data);
    let template;
    console.log(this.module);
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
    this.tabsComponent.openTab(data.name, template, data, true);
  }

  //opportunity modal
  openOpportunityModal(data:any){
    console.log(data)
    this.modalData = data;
    this.formType = 'edit';
    this.opportunityOpen = false;
  }
  openNewOpportunityModal(){
    this.formType = 'new';
    this.opportunityOpen = false;
  }
  closeModal(){
    this.opportunityOpen = true;
    this.modalData = [];
  }
  updateOpportunity(event:any){
    console.log(JSON.stringify(event))
    let endpoint:any;
    if(this.formType =='edit'){
      endpoint = 'leadUpdate';
    }
    if(this.formType =='new'){
      endpoint = 'quickLeadInsert';
      //event = JSON.stringify(event)
    }

    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/"+endpoint,event)
      .subscribe((response: any) => {
        console.log(response)
        this.opportunityOpen = true;
        this.modalData = [];
      });
      
  }
  //vehicleStock Modal
  updatevehicleStockModal(data:any){
    this.modalData = data;
    this.formType = 'edit';
    this.opportunityOpen = false;
  }
  updatevehicleStock(event:any){
    console.log(event)
    let endpoint:any;
    if(this.formType =='edit'){
      endpoint = 'vehicle_stockUpdate';
    }
    if(this.formType =='new'){
      //endpoint = 'createCustomer';
    }
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/"+endpoint,event)
      .subscribe((response: any) => {
        console.log(response)
        this.opportunityOpen = true;
        this.modalData = [];
      });
  }
  //Driver modal
  updateDriverModal(data:any){
    this.modalData = data;
    this.formType = 'edit';
    this.opportunityOpen = false;
  }
  updateDriver(event:any){
    console.log(event)
    let endpoint:any;
    if(this.formType =='edit'){
      endpoint = 'driverUpdate';
    }
    if(this.formType =='new'){
      //endpoint = 'createCustomer';
    }
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/"+endpoint,event)
      .subscribe((response: any) => {
        console.log(response)
        this.opportunityOpen = true;
        this.modalData = [];
      });
  }
  //customer modal
  openNewCustomerModal(){
    this.formType = 'new';
    this.opportunityOpen = false;
  }
  updateCustomerModal(data:any){
    this.modalData = data;
    this.formType = 'edit';
    this.opportunityOpen = false;
  }
  updateCustomer(event:any){
    let endpoint:any;
    if(this.formType =='edit'){
      endpoint = 'customerUpdate';
    }
    if(this.formType =='new'){
      endpoint = 'createCustomer';
    }
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/"+endpoint,event)
      .subscribe((response: any) => {
        console.log(response)
        this.opportunityOpen = true;
        this.modalData = [];
      });
  }
  //https://stackblitz.com/edit/angular-dynamic-tabs?file=app%2Fpeople%2Fperson-edit.component.ts
}
