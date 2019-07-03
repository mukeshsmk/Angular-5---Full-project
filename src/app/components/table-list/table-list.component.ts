import { Component, ViewChild, QueryList, ViewChildren } from "@angular/core";

import { TabsComponent } from "../tab/tabs.component";
import { HttpClient } from "@angular/common/http";
import { GeneralService } from "../../shared/services/GeneralService";
import { ApiService } from "../../shared/services/ApiServices";

@Component({
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
  @ViewChild("searchModal") searchModalTemplate: any;
  @ViewChild("dashboardDetails") dashboardTemplate: any;
  @ViewChild("profileDetails") profileTemplate: any;
  @ViewChild("calendarDetails") calendarTemplate: any;

  @ViewChildren("checkedAll") checkedAll: QueryList<any>;

  loaderOne: Boolean = false;
  opportunityList: any = [];
  module: string = "opportunities";
  opportunityListData: any = [];
  page: number = 1;
  limit: number = 10;
  search: any = "";
  showEdit: Boolean = false;
  opportunityOpen: Boolean = true;
  searchOpen: Boolean = false;
  vehicleStock: Boolean = false;
  modalData: any = [];
  formType: any;
  responseData: any;
  permission: any;
  vsType: any = "";
  userData: any;
  sort: any = "id";
  allocated: any = "";
  unallocated: any = "";
  changeLead: Boolean = false;
  aIds: any = [];
  Searchwait: Boolean = false;
  sdname: any;
  searchUserData: any;
  oppCompany: Boolean = false;
  oppPhone: Boolean = false;
  oppEmail: Boolean = false;
  opp_Company: any;
  opp_Phone: any;
  opp_Email: any;
  editId: any;
  editTag: any;
  modal_title: any;
  errAlert: Boolean = false;
  successAlert: Boolean = false;
  sortDirection: string = "ASC";
  opp_EmailErr: Boolean = false;

  searchTerm: string;
  constructor(
    private http: HttpClient,
    public generalService: GeneralService,
    public apiService: ApiService
  ) {
    const params = this.getParams();
    this.generalService.dashboardEvent.subscribe((type: string) => {
      this.tabsComponent.openTab(
        type,
        this.dashboardTemplate,
        null,
        true,
        "dashboard"
      );
    });
    this.generalService.profileEvent.subscribe((type: string) => {
      this.tabsComponent.openTab(
        type,
        this.profileTemplate,
        null,
        true,
        "profile"
      );
    });
    this.generalService.calendarEvent.subscribe((type: string) => {
      this.tabsComponent.openTab(
        type,
        this.calendarTemplate,
        null,
        true,
        "Dairy"
      );
    });

    this.generalService.emitter.subscribe((response: string) => {
      this.module = response;
      if (
        this.module !== "Dashboard" &&
        this.module !== "Profile" &&
        this.module !== "Calendar"
      ) {
        this.sort = params.sort = "id";
        this.search = params.search = "";
        this.loadData(this.module, params);
        console.log("Loading data", this.module);
      }
    });
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.changeLead = false;
    this.aIds = [];
    this.loadData(this.module, params);
  }

  onClose(event: any) {
    this.closeModal();
  }

  refresh() {
    const params = this.getParams();
    params.search = "";
    this.search = "";
    this.loadData(this.module, params);
  }

  setPermission() {
    this.permission = {
      group_id: this.userData.group_id,
      create_permission: 0,
      edit_permission: 0,
      delete_permission: 0
    };
  }
  loadData(type: string, params: any) {
    this.loaderOne = true;
    this.changeLead = false;
    this.opportunityList = [];
    this.opportunityListData = [];
    this.setPermission();
    params.userData = JSON.parse(localStorage.getItem("user_data"));
    this.http
      .post<{ success: object }>(this.apiService.getModulesUrl(type), params)
      .subscribe((response: any) => {
        this.responseData = response;
        this.opportunityListData = response.list;
        if (type === "opportunities") {
          for (let i = 0; i < response.list.data.length; i++) {
            if (params.userData.roleid !== 5) {
              response.list.data[i].lead_owner_data = response.list.data[i]
                .lead_owner_data
                ? response.list.data[i].lead_owner_data
                : "-";
            }
          }
        }
        let permission = response.permission[0]
          ? response.permission[0]
          : this.permission;
        this.permission = permission;
        this.opportunityListData.lastPage = Array(
          this.opportunityListData.last_page
        )
          .fill(1)
          .map((x, i) => i);
        this.opportunityList = response.list.data;
        this.loaderOne = false;
      });
  }
  allocate(arg: any) {
    if (arg === "allocated") {
      this.allocated = "allocated";
      this.unallocated = "";
    } else if (arg === "unallocated") {
      this.unallocated = "unallocated";
      this.allocated = "";
    } else {
      this.unallocated = "";
      this.allocated = "";
    }
    this.changeLead = false;
    const params = this.getParams();
    params.page = 1;
    this.loadData(this.module, params);
  }
  searchList(searchData: any) {
    if (searchData.length >= 3 || searchData.length === 0) {
      this.search = searchData;
      const params = this.getParams();
      params.page = 1;
      this.loadData(this.module, params);
    }
  }
  pageCount(limit: any) {
    this.limit = limit;
    this.page = 1;
    const params = this.getParams();
    this.loadData(this.module, params);
  }
  pageNumber(page: any) {
    if (page >= 1 && page <= this.opportunityListData.last_page) {
      this.page = page;
      const params = this.getParams();
      this.loadData(this.module, params);
    }
  }
  vehicleStockType(type: any) {
    this.vsType = type;
    const params = this.getParams();
    params.page = 1;
    this.loadData(this.module, params);
  }
  activateClass(i: any) {
    i.active = !i.current_page;
  }
  sortData(sort: any) {
    this.sortDirection =
      this.sort == sort
        ? this.sortDirection == "DESC"
          ? "ASC"
          : "DESC"
        : "ASC";

    this.sort = sort;
    const params = this.getParams();
    params.page = 1;
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
    this.modal_title = "Edit Opportunity";
    this.modalData = data;
    this.formType = "edit";
    this.opportunityOpen = false;
  }
  openNewOpportunityModal() {
    this.modal_title = "Quick Opportunity";
    this.formType = "new";
    this.opportunityOpen = false;
  }
  closeModal() {
    this.opportunityOpen = true;
    this.modalData = [];
  }
  updateOpportunity(event: any) {
    this.loaderOne = true;
    let endpoint: any;
    if (this.formType === "edit") {
      endpoint = this.apiService.leadUpdateUrl;
      event.lastmodifiedbyid = this.userData.user_sfid;
    }
    if (this.formType === "new") {
      endpoint = this.apiService.quickLeadInsertUrl;
      //event = JSON.stringify(event)
    }

    this.http
      .post<{ success: object }>(endpoint, event)
      .subscribe((response: any) => {
        console.log(response);
        //this.opportunityOpen = true;
        if (response.StatusCode == 200) {
          this.successAlert = true;
        } else {
          this.errAlert = true;
        }
        this.opportunityOpen = true;
        this.modalData = [];
        this.loadData(this.module, {});
        this.loaderOne = false;
        this.refresh();
      });
  }
  //vehicleStock Modal
  updatevehicleStockModal(data: any) {
    this.modal_title = "Edit " + data.name;
    this.modalData = data;
    this.formType = "edit";
    this.opportunityOpen = false;
  }
  updatevehicleStock(event: any) {
    this.loaderOne = true;
    console.log(event);
    let endpoint: any;
    if (this.formType === "edit") {
      event.lastmodifiedbyid = this.userData.user_sfid;
      endpoint = this.apiService.vehicle_stockUpdateUrl;
    }
    if (this.formType === "new") {
      //endpoint = this.apiService.createCustomerUrl;
    }
    this.http
      .post<{ success: object }>(endpoint, event)
      .subscribe((response: any) => {
        console.log(response);
        if (response == 1) {
          this.successAlert = true;
        }
        this.opportunityOpen = true;
        this.modalData = [];
        this.loaderOne = false;
        this.refresh();
      });
  }
  //Driver modal
  updateDriverModal(data: any) {
    this.modal_title = "Edit " + data.name;
    this.modalData = data;
    this.formType = "edit";
    this.opportunityOpen = false;
  }
  updateDriver(event: any) {
    this.loaderOne = true;
    console.log(event);
    let endpoint: any;
    if (this.formType === "edit") {
      endpoint = this.apiService.driverUpdateUrl;
      event.lastmodifiedbyid = this.userData.user_sfid;
    }
    if (this.formType === "new") {
      endpoint = this.apiService.createDriverUrl;
    }
    this.http
      .post<{ success: object }>(endpoint, event)
      .subscribe((response: any) => {
        console.log(response);
        this.opportunityOpen = true;
        this.modalData = [];
        this.loaderOne = false;
        this.refresh();
      });
  }
  //customer modal
  openNewCustomerModal() {
    this.modal_title = "New " + this.module;
    this.formType = "new";
    this.opportunityOpen = false;
  }
  updateCustomerModal(data: any) {
    this.modal_title = "Edit " + data.name;
    this.modalData = data;
    this.formType = "edit";
    this.opportunityOpen = false;
  }
  updateCustomer(event: any) {
    this.loaderOne = true;
    let endpoint: any;
    if (this.formType === "edit") {
      endpoint = this.apiService.customerUpdateUrl;
      event.lastmodifiedbyid = this.userData.user_sfid;
    }
    if (this.formType === "new") {
      endpoint = this.apiService.createCustomerUrl;
    }
    this.http
      .post<{ success: object }>(endpoint, event)
      .subscribe((response: any) => {
        console.log(response);
        this.opportunityOpen = true;
        this.modalData = [];
        this.loaderOne = false;
        this.refresh();
      });
  }

  checkedall(arg: any) {
    const all_id = document.querySelectorAll("input[name='selected']:checked");
    if (arg.target.checked) {
      this.changeLead = true;
      for (let x = 0, l = this.checkedAll.toArray().length; x < l; x++) {
        this.checkedAll.toArray()[x].nativeElement.checked = true;
        this.aIds.push(this.checkedAll.toArray()[x].nativeElement.value);
      }
    } else {
      this.changeLead = false;
      for (let x = 0, l = all_id.length; x < l; x++) {
        this.checkedAll.toArray()[x].nativeElement.checked = false;
      }
      this.aIds = [];
    }
    console.log(this.aIds);
  }

  checked() {
    console.log(this.checkedAll.toArray());
    this.aIds = [];
    const all_id = document.querySelectorAll("input[name='selected']:checked");
    for (let x = 0, l = this.checkedAll.toArray().length; x < l; x++) {
      if (this.checkedAll.toArray()[x].nativeElement.checked === true)
        this.aIds.push(this.checkedAll.toArray()[x].nativeElement.value);
    }
    if (all_id.length > 0) {
      this.changeLead = true;
    } else {
      this.changeLead = false;
      this.aIds = [];
    }
    console.log(this.aIds);
  }
  getSearchModal() {
    this.searchOpen = true;
  }
  searchUserdetails() {
    if (this.sdname.length !== 0) {
      this.Searchwait = true;
      console.log(this.sdname);
      const assignSfidparams = {
        keyword: this.sdname
      };
      this.http
        .post<{ success: object }>(
          this.apiService.getSearchDataUrl,
          assignSfidparams
        )
        .subscribe((response: any) => {
          this.searchUserData = response;
          console.log(response);
          this.Searchwait = false;
        });
    }
  }
  assign(id: any) {
    this.loaderOne = true;
    const assignSfid = {
      id: id,
      editID: this.aIds
    };
    this.http
      .post<{ success: object }>(this.apiService.assignSfidUrl, assignSfid)
      .subscribe((response: any) => {
        this.searchUserData = [];
        this.sdname = "";
        console.log(response);
        this.searchOpen = false;
        const params = this.getParams();
        this.loaderOne = false;
        this.changeLead = false;
        this.loadData(this.module, params);
      });
  }
  closeSeacrch() {
    this.searchUserData = [];
    this.sdname = "";
    this.searchOpen = false;
  }
  inLineEdit(text: any) {
    this.opp_Company = text.company__c;
    this.opp_Phone = text.phone__c;
    this.opp_Email = text.email__c;
    this.editId = text.id;
  }
  updateLead(details: any) {
    this.loaderOne = true;
    this.opp_EmailErr = false;
    details.company__c = this.opp_Company;
    details.phone__c = this.opp_Phone;
    details.email__c = this.opp_Email;
    details.lastmodifiedbyid = this.userData.user_sfid;
    console.log(details);
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g.test(this.opp_Email)) {
      this.http
        .post<{ success: object }>(this.apiService.inlineUpdateUrl, details)
        .subscribe((response: any) => {
          console.log(response);
          this.editId = "";
          this.loaderOne = false;

          this.loadData(this.module, this.getParams());
        });
    } else {
      this.loaderOne = false;
      this.opp_EmailErr = true;
    }
  }
  getParams() {
    const params = {
      page: this.page,
      limit: this.limit,
      search: this.search,
      type: this.vsType,
      sort: this.sort,
      sortDirection: this.sortDirection,
      allocated: this.allocated,
      unallocated: this.unallocated
    };
    return params;
  }
  //https://stackblitz.com/edit/angular-dynamic-tabs?file=app%2Fpeople%2Fperson-edit.component.ts
}
