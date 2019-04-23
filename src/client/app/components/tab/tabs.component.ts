/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver
} from "@angular/core";

import { TabComponent } from "./tab.component";
import { DynamicTabsDirective } from "./dynamic-tabs.directive";

import GeneralService from "../../shared/services/GeneralService";

@Component({
  selector: "sd-tabs",
  template: `
    <ul class="nav nav-tabs">
      <li
        *ngFor="let tab of tabs"
        (click)="selectTab(tab)"
        class="selectTab"
        [class.active]="tab.active"
      >
        <a href="#">
          <select class="pointer" (change)="moduleChanged($event.target.value)">
            <option value="opportunities">Opportunity</option>
            <option value="vehicle_stocks">Vehicle Stock</option>
            <option value="drivers">Driver</option>
            <option value="customers">Customer</option>
          </select>
        </a>
      </li>
      <!-- dynamic tabs -->
      <li
        *ngFor="let tab of dynamicTabs"
        (click)="selectTab(tab)"
        class="dynamicTabs"
        [class.active]="tab.active"
      >
        <a href="#"
          >{{ tab.title }}
          <span
            class="tab-close"
            *ngIf="tab.isCloseable"
            (click)="closeTab(tab)"
            >X</span
          ></a
        >
      </li>
    </ul>
    <ng-content></ng-content>
    <ng-template dynamic-tabs #container></ng-template>
  `,
  styles: [
    `
      nav-tabs ul {
        background: red;
      }
      .nav{
        margin-top: 0;
      }
      .pointer {cursor: pointer;}
      .tab-close {
        color: gray;
        text-align: right;
        font-size: 12px;
        margin: 0 5px;
        font-weight: bold;
      }
      .tab.active {
        background: red;
      }
      .selectTab active{
        border-top: 1px solid #EF1B24;
        border-bottom: 1px solid #EF1B24;
      }
      
      .nav-tabs select {
        background: #fff;
        word-wrap: normal;
        font-family: inherit;
        padding: 10px 35px;
        font-size: 14px;
      }
      .nav-tabs {
        border-bottom: 1px solid #db4e4e !important;
      }
      .nav-tabs ul {
        margin: 0px 0 0;
        padding: 0 0 0 20px;
      }
      .selectTab {
        margin: 0px 10px 0 3%;
      }

      .dynamicTabs {
        padding: 7px 25px;
        border: 1px solid #000000;
        background: #f4f7f9;
        font-size: 16px;
        color: #000 !important;
        margin: 0px 3px 0 0px;
      }
      .active{
        border-top: 1px solid #EF1B24;
        border-bottom: 1px solid #EF1B24;
    }
      .dynamicTabs a {
        color: #828383;
        text-decoration: none;
      }
      sd-tabs ul{
        margin: 0;
      }
    `
  ]
})
export class TabsComponent implements AfterContentInit {
  dynamicTabs: TabComponent[] = [];
  listTabs: TabComponent[] = [];

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @ViewChild(DynamicTabsDirective) dynamicTabPlaceholder: DynamicTabsDirective;

  /*
    Alternative approach of using an anchor directive
    would be to simply get hold of a template variable
    as follows
  */
  // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    public generalService: GeneralService
  ) {}

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  openTab(title: string, template: any, data: any, isCloseable = false) {
    // get a component factory for our TabComponent
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      TabComponent
    );

    // fetch the view container reference from our anchor directive
    const viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    // alternatively...
    // let viewContainerRef = this.dynamicTabPlaceholder;

    // create a component instance
    const componentRef = viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    const instance: TabComponent = componentRef.instance as TabComponent;
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;

    // remember the dynamic component for rendering the
    // tab navigation headers
    if (this.dynamicTabs.length > 9) {
      const tab = this.dynamicTabs.pop();
      this.listTabs.push(tab);
      this.dynamicTabs.push(componentRef.instance as TabComponent);
      // set it active
    } else {
      this.dynamicTabs.push(componentRef.instance as TabComponent);
    }
    // set it active
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  selectTab(tab: TabComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
  }

  closeTab(tab: TabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i, 1);

        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);

        // set tab index to 1st one
        this.selectTab(this.tabs.first);
        break;
      }
    }

    if (this.dynamicTabs.length < 9 && this.listTabs.length > 0) {
      const tab = this.listTabs.pop();
      this.dynamicTabs.push(tab);
    }
  }

  closeActiveTab() {
    const activeTabs = this.dynamicTabs.filter(tab => tab.active);
    if (activeTabs.length > 0) {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }

  moduleChanged(type: string) {
    this.generalService.changeModule(type);
  }
}
