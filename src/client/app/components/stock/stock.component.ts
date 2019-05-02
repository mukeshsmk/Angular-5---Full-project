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

  visibleDetail: Boolean = false;
  visibleEdit: Boolean = true;
  visibleRealted: Boolean = true;

  visible1: Boolean = false;
  visible2: Boolean = true;
  @Input() stock: any;

  constructor() {
    console.log(this.stock);
  }
}
