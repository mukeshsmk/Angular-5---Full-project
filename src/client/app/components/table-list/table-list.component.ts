import { Component, OnInit, ViewChild } from "@angular/core";

import { TabsComponent } from "../tab/tabs.component";
import { HttpClient } from "@angular/common/http";
import GeneralService from "../../shared/GeneralService";
import { Template } from "@angular/compiler/src/render3/r3_ast";

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

  opportunityList: any = [];
  module: string = "opportunities";
  opportunityListData: any = [];
  page:number = 1;
  limit:number = 10;

  constructor(private http: HttpClient, public generalService: GeneralService) {
    let params = {
      page:this.page,
      limit:this.limit
    }
    this.generalService.emitter.subscribe((response: string) => {
      this.module = response;
      this.loadData(this.module,(params));
      console.log("Loading data", this.module);
    });
    this.loadData(this.module,(params));
  }

  loadData(type: string,params:any) {
    params = 'page='+params.page+'&limit='+params.limit;
    this.http
      .get<{ success: object }>("http://10.0.0.9:8080/api/" + type+'?'+params)
      .subscribe(response => {
        this.opportunityListData = response;
        this.opportunityListData.last_page = Array(this.opportunityListData.last_page).fill(1).map((x,i)=>i);
        this.opportunityList = response.data;
      });
  }
  pageCount(limit:any){
    this.limit = limit;
    let params = {
      page:this.page,
      limit:this.limit
    }
   
    this.loadData(this.module,params)
  }
  pageNumber(page:any){
    this.page = page;
    let params = {
      page:this.page,
      limit:this.limit
    }
    this.loadData(this.module,params)
  }
  activateClass(i:any){
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
        this.opportunityList = this.opportunityList.sort(function(a, b) {
          var x = a.company.toLowerCase();
          var y = b.company.toLowerCase();
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
        this.opportunityList = this.opportunityList.sort(function(a, b) {
          var x = a.phone;
          var y = b.phone;
          return x - y;
        });
        break;
      case "email":
        this.opportunityList = this.opportunityList.sort(function(a, b) {
          var x = a.email.toLowerCase();
          var y = b.email.toLowerCase();
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
        this.opportunityList = this.opportunityList.sort(function(a, b) {
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
        this.opportunityList = this.opportunityList.sort(function(a, b) {
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
    switch(this.module){
      case 'opportunities': 
        template = this.persondetailsTemplate;
      break;
      case 'vehicle_stocks': 
        template = this.stockdetailsTemplate;
      break;
      case 'drivers': 
        template = this.driverdetailsTemplate;
      break;
      case 'customers': 
        template = this.customerdetailsTemplate;
      break;
    }
    console.log(template);
    this.tabsComponent.openTab(
      data.name,
      template,
      data,
      true
    );
  }

  //https://stackblitz.com/edit/angular-dynamic-tabs?file=app%2Fpeople%2Fperson-edit.component.ts
}
