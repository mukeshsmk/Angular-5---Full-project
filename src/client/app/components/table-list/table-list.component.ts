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
  @ViewChild(TabsComponent) tabsComponent:any;
  @ViewChild('personDetails') persondetailsTemplate:any;
  opportunityList = [
    {
      "id": 1,
      "name": "aDakota Rice",
      "company": "abc",
      "phone": 1234567890,
      "email": "xyz@gmail.com",
      "leadowner": "fabc"
    },
    {
      "id": 1,
      "name": "eDakota Rice",
      "company": "bcd",
      "phone": 2345678901,
      "email": "xyz@gmail.com",
      "leadowner": "dabc"
    },
    {
      "id": 1,
      "name": "bDakota Rice",
      "company": "cde",
      "phone": 3456789012,
      "email": "xyz@gmail.com",
      "leadowner": "sabc"
    },
    {
      "id": 1,
      "name": "wDakota Rice",
      "company": "def",
      "phone": 4567891230,
      "email": "xyz@gmail.com",
      "leadowner": "pabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "efg",
      "phone": 567890123,
      "email": "xyz@gmail.com",
      "leadowner": "oabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "fgh",
      "phone": 6789012345,
      "email": "xyz@gmail.com",
      "leadowner": "iabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "uabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "yabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "tabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "rabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "eabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "wabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "qabc"
    },
    {
      "id": 1,
      "name": "Dakota Rice",
      "company": "Niger",
      "phone": 547648478,
      "email": "xyz@gmail.com",
      "leadowner": "xyz"
    }
  ]
  sort(arg){
    switch(arg){
      case 'name': 
      this.opportunityList = this.opportunityList.sort(function(a, b){
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
      break;
      case 'company': 
      this.opportunityList = this.opportunityList.sort(function(a, b){
        var x = a.company.toLowerCase();
        var y = b.company.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
      break;
      case 'phone': 
      this.opportunityList = this.opportunityList.sort(function(a, b){
        var x = a.phone;
        var y = b.phone;
        return x-y;
      })
      break;
      case 'email': 
      this.opportunityList = this.opportunityList.sort(function(a, b){
        var x = a.email.toLowerCase();
        var y = b.email.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
      break;
      case 'leadowner': 
      this.opportunityList = this.opportunityList.sort(function(a, b){
        var x = a.leadowner.toLowerCase();
        var y = b.leadowner.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
      break;
      case 'id': 
      this.opportunityList = this.opportunityList.sort(function(a, b){
        var x = a.id;
        var y = b.id;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
      break;
    }
    
  }
  viewPersondetails(data:any){
    console.log(this.persondetailsTemplate)
    this.tabsComponent.openTab(data.name, this.persondetailsTemplate, data, true);
  }

  
  //https://stackblitz.com/edit/angular-dynamic-tabs?file=app%2Fpeople%2Fperson-edit.component.ts
}
