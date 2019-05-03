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
  selector: "sd-stock",
  templateUrl: "stock.component.html",
  styleUrls: ["stock.component.css"]
})
export class StockComponent implements OnInit{
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  visibleDetail: Boolean = true;
  visibleEdit: Boolean = false;
  visibleRelated: Boolean = false;
  attachmentOpen:Boolean = false;
  submitted:Boolean = false;
  updateSuccess:Boolean = false;
  updateFailure:Boolean = false;
  relatedListData: any = [];

  loaderOne: Boolean = false;
  page: number = 1;
  limit: number = 10;
  search: any = "";
  sort: any = "id";

  @Input() stock: any;
  vehicleStockForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
  }

  ngOnInit(){
    if(this.stock){
      this.vehicleStockForm = this.formBuilder.group({
        name: [this.stock.name, Validators.required],
        selling_dealer__c: [this.stock.selling_dealer__c],
        vin__c: [this.stock.vin__c],
        vehicle_type__c: [this.stock.vehicle_type__c],
        fuel_type__c: [this.stock.fuel_type__c],
        rego_no__c: [this.stock.rego_no__c],
        manufacture_year__c: [this.stock.manufacture_year__c],
        body_type__c: [this.stock.body_type__c],
        model__c: [this.stock.model__c],
        body_colour__c: [this.stock.body_colour__c],
        make__c: [this.stock.make__c],
        first_image_name__c: [this.stock.first_image_name__c],
        dealer_code__c: [this.stock.dealer_code__c],
        vehicle_stock_days__c: [this.stock.vehicle_stock_days__c],
        ownerid: [this.stock.ownerid],
        egc_price__c: [this.stock.egc_price__c],
        series_c__c: [this.stock.series_c__c],
        stock_image__c: [this.stock.stock_image__c]
      });
    }
    const params = {
      page: this.page,
      limit: this.limit,
      search: this.search,
      sort: this.sort,
      "id":this.stock.sfid
      }
    this.relatedStocks(params);
  }
  relatedStocks(params:any){    
    this.loaderOne = true;
    this.http
      .post<{ success: object }>(Config.BASE_URL + "api/relatedVehicle_stock", params)
      .subscribe((response: any) => {
        this.relatedListData = response;
        this.loaderOne = false;
      });
  }
  sortData(sort:any){
    this.sort = sort;
    const params = {
      page: this.page,
      limit: this.limit,
      search: this.search,
      sort: this.sort,
      "id":this.stock.sfid
      }
    this.relatedStocks(params);
  }
  searchList(searchData: any) {
    if (searchData.length >= 3 || searchData.length === 0) {
      this.search = searchData;
      const params = {
        page: 1,
        limit: this.limit,
        search: this.search,
        sort: this.sort
      };
      this.relatedStocks(params);
    }
  }
  pageCount(limit: any) {
    this.limit = limit;
    const params = {
      page: 1,
      limit: this.limit,
      search: this.search,
      sort: this.sort
    };

    this.relatedStocks(params);
  }
  pageNumber(page: any) {
    if(page >= 1 && page <= this.relatedListData.last_page){
      this.page = page;
      const params = {
        page: this.page,
        limit: this.limit,
        search: this.search,
        sort: this.sort
      };
      this.relatedStocks(params);
    }
  }

  onSubmitUpdate() {
    this.submitted = true;
    if (this.vehicleStockForm.invalid) {
      return;
    }

      this.vehicleStockForm.value.id = this.stock.id;
      this.http
      .post<{ success: object }>(Config.BASE_URL + "api/vehicle_stockUpdate", this.vehicleStockForm.value)
      .subscribe((response: any) => {
        if(response == 1){
          this.updateSuccess = true;
          this.stock = this.vehicleStockForm.value;
        }else{  
          this.updateFailure = true;
        }
        this.viewDetail();
      });
  }

  viewEdit(){
    this.visibleDetail = false;
    this.visibleEdit = true;
    this.visibleRelated = false;
  }
  viewDetail(){
    this.visibleDetail = true;
    this.visibleEdit = false;
    this.visibleRelated = false;
  }
  viewRelated(){
    this.visibleDetail = false;
    this.visibleEdit = false;
    this.visibleRelated = true;
  }
  addAttachment(){
    this.attachmentOpen = true;
  }
  close(){
    this.attachmentOpen = false;
  }
}
 