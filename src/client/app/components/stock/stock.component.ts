import { Component, OnInit, Input } from "@angular/core";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-stock",
  templateUrl: "stock.component.html",
  styleUrls: ["stock.component.css"]
})
export class StockComponent {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  visibleDetail: Boolean = true;
  visibleEdit: Boolean = false;
  visibleRelated: Boolean = false;
  attachmentOpen:Boolean = false;


  @Input() stock: any;

  constructor() {
    console.log(this.stock);
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
 