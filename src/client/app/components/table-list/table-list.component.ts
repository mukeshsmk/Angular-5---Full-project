import { Component, OnInit, ViewChild } from '@angular/core';

import { TabsComponent } from '../tab/tabs.component';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-table-list',
  templateUrl: 'table-list.component.html',
  styleUrls: ['table-list.component.css']
})
export class TableListComponent {
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild('personDetails') persondetailsTemplate;
  opportunityList = [
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "abc"
    }
  ]
  
  viewPersondetails(data){
    console.log(this.persondetailsTemplate)
    this.tabsComponent.openTab(data.name, this.persondetailsTemplate, data, true);
  }
  //https://stackblitz.com/edit/angular-dynamic-tabs?file=app%2Fpeople%2Fperson-edit.component.ts
}
