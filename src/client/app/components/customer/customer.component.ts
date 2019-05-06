import { Component, OnInit, Input } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.css']
})
export class CustomerComponent {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  visible1: Boolean = false;
  visible2: Boolean = false;
  visible3: Boolean = true;

  visibleDetail: Boolean = true;
  visibleRelated: Boolean = false;

  newcaseOpen:Boolean = false;
  newdriverOpen:Boolean = false;

  @Input() customer: any;

  addnewCase(){
    this.newcaseOpen = true;
  }
  addnewDriver(){
    this.newdriverOpen = true;
  }
  close(){
    this.newcaseOpen = false;
    this.newdriverOpen = false;
  }
  viewDetail(){
    this.visibleDetail = true;
    this.visibleRelated = false;
  }
  viewRelated(){
    this.visibleDetail = false;
    this.visibleRelated = true;
  }

}
