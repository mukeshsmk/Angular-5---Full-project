import { Component, OnInit, ViewChild } from "@angular/core";

import { TabsComponent } from "../tab/tabs.component";
import { HttpClient } from "@angular/common/http";
import GeneralService from "../../shared/GeneralService";

@Component({
  moduleId: module.id,
  selector: "sd-table-list",
  templateUrl: "table-list.component.html",
  styleUrls: ["table-list.component.css"]
})
export class TableListComponent {
  @ViewChild(TabsComponent) tabsComponent: any;
  @ViewChild("personDetails") persondetailsTemplate: any;
  opportunityList: any = [];
  module: string = "opportunities";

  constructor(private http: HttpClient, public generalService: GeneralService) {
    this.generalService.emitter.subscribe((response: string) => {
      this.module = response;
      this.loadData(this.module);
      console.log("Loading data", this.module);
    });
    this.loadData(this.module);
  }

  loadData(type: string) {
    this.http
      .get<{ success: object }>("http://localhost:8080/api/" + type)
      .subscribe(response => {
        this.opportunityList = response;
      });
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
    console.log(this.persondetailsTemplate);
    this.tabsComponent.openTab(
      data.name,
      this.persondetailsTemplate,
      data,
      true
    );
  }

  //https://stackblitz.com/edit/angular-dynamic-tabs?file=app%2Fpeople%2Fperson-edit.component.ts
}
