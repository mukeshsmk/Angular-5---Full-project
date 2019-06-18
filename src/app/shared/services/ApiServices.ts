// src/app/auth/api.service.ts

import { Injectable } from "@angular/core";
import Config from "../config";

@Injectable()
export class ApiService {
  //base url
  baseUrl = Config.BASE_URL;
  apiUrl = this.baseUrl + "api/";

  //login
  loginUrl = this.apiUrl + "login";
  //register
  registerUrl = this.apiUrl + "register";
  //resetPassword
  resetPasswordUrl = this.apiUrl + "password/reset";
  //forgotpassword
  forgotpasswordUrl = this.apiUrl + "password/email";
  //updatePassword
  updatePasswordUrl = this.apiUrl + "updatePassword";

  //tabs page
  //Drop down data
  homeGetDropdownDataUrl = this.apiUrl + "home-getDropdownData";

  //table-list page
  //modules
  public getModulesUrl(type) {
    return this.apiUrl + type;
  }
  //leadEditFetch
  leadEditFetchUrl = this.apiUrl + "leadEditFetch";
  //leadUpdate
  leadUpdateUrl = this.apiUrl + "leadUpdate";
  //quickLeadInsert
  quickLeadInsertUrl = this.apiUrl + "quickLeadInsert";
  //vehicle_stockUpdate
  vehicle_stockUpdateUrl = this.apiUrl + "vehicle_stockUpdate";
  //createCustomer
  createCustomerUrl = this.apiUrl + "createCustomer";
  //driverUpdate
  driverUpdateUrl = this.apiUrl + "driverUpdate";
  //createDriver
  createDriverUrl = this.apiUrl + "createDriver";
  //customerUpdate
  customerUpdateUrl = this.apiUrl + "customerUpdate";
  //getSearchData
  getSearchDataUrl = this.apiUrl + "getSearchData";
  //assignSfid
  assignSfidUrl = this.apiUrl + "assignSfid";
  //inlineUpdate
  inlineUpdateUrl = this.apiUrl + "inlineUpdate";

  //Stocks page
  relatedVehicle_stockUrl = this.apiUrl + "relatedVehicle_stock";

  //Driver page
  relatedDriverUrl = this.apiUrl + "relatedDriver";
  createCampaignUrl = this.apiUrl + "createCampaign";

  //Customer page
  driverDetailsUrl = this.apiUrl + "driverDetails";
  accountHistoryUrl = this.apiUrl + "accountHistory";

  //Activities page
  activitiesUrl = this.apiUrl + "activities";
  notificationUrl = this.apiUrl + "notification";

  //Personal Activities page
  personal_activitiesUrl = this.apiUrl + "personal_activities";

  //Navigation page
  public updateStageUrl(stage) {
    return this.apiUrl + stage;
  }

  //Calendar page
  personal_eventsUrl = this.apiUrl + "personal_events";

  //general api
  public getUrlByParams(endpoint) {
    return this.apiUrl + endpoint;
  }

  //vehicle model data
  getModelUrl = this.apiUrl + "getModel";
}
