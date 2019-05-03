import { Component, OnInit, Input } from '@angular/core';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-driver',
  templateUrl: 'driver.component.html',
  styleUrls: ['driver.component.css']
})
export class DriverComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  visibleDetail: Boolean = true;
  visibleRelated: Boolean = false;

  newcaseOpen:Boolean = false;
  campaignOpen:Boolean = false;
  attachmentOpen:Boolean = false;

  @Input() driver: any;

  ngOnInit() {}

  addnewCase(){
    this.newcaseOpen = true;
  }
  addcampaign(){
    this.campaignOpen = true;
  }
  addAttachment(){
    this.attachmentOpen = true;
  }
  close(){
    this.newcaseOpen = false;
    this.campaignOpen = false;
    this.attachmentOpen = false;
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
