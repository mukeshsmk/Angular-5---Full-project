/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  OnInit,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver
} from "@angular/core";

import { TabComponent } from "./tab.component";
import { DynamicTabsDirective } from "./dynamic-tabs.directive";

import GeneralService from "../../shared/services/GeneralService";
import { isComponentInstance } from "@angular/core/src/render3/context_discovery";

@Component({
  moduleId: module.id,
  selector: "sd-tabs",
  templateUrl: "tabs.component.html",
  styleUrls: ["tabs.component.css"]
})
export class TabsComponent implements OnInit, AfterContentInit {
  listModules: any[] = [
    {
      id: "opportunities",
      title: "Opportunity"
    },
    {
      id: "vehicle_stocks",
      title: "Vehicle Stocks"
    },
    {
      id: "drivers",
      title: "Drivers"
    },
    {
      id: "customers",
      title: "Customers"
    }
  ];
  dynamicTabs: TabComponent[] = [];
  hiddenTabs: TabComponent[] = [];
  selectedHiddenTab: number;
  selectedModule: string;

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

  ngOnInit() {
    this.selectedModule = this.listModules[0].title;
    this.generalService.changeModule(this.listModules[0].id);
  }

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  openTab(
    title: string,
    template: any,
    data: any,
    isCloseable = false,
    tabId: string
  ) {
    // Before pushing it into the tabs, find whether same tab exists
    const foundInDynamicTab = this.dynamicTabs.find(obj => obj.tabId === tabId);
    const foundInHiddenTab = this.hiddenTabs.find(obj => obj.tabId === tabId);

    if (foundInDynamicTab || foundInHiddenTab) {
      if (foundInDynamicTab) {
        this.selectTab(foundInDynamicTab);
      }
      if (foundInHiddenTab) {
        const index = this.hiddenTabs.indexOf(foundInHiddenTab);
        const tab = this.hiddenTabs.splice(index, 1);
        this.hiddenTabs.push(this.dynamicTabs.pop());
        this.dynamicTabs.push(tab[0]);
        this.selectTab(tab[0]);
      }
    } else {
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
      instance.tabId = tabId;

      // remember the dynamic component for rendering the
      // tab navigation headers
      if (this.dynamicTabs.length > 4) {
        const tab = this.dynamicTabs.pop();
        this.hiddenTabs.push(tab);
        this.dynamicTabs.push(componentRef.instance as TabComponent);
      } else {
        this.dynamicTabs.push(componentRef.instance as TabComponent);
      }

      // set it active
      this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    }
  }

  selectHiddenTab(index: number) {
    // deactivate all tabs
    const removeItems = this.hiddenTabs.splice(index, 1);
    const hiddenTab = removeItems[0];

    const lastDynamicTab = this.dynamicTabs.pop();

    this.dynamicTabs.push(hiddenTab);

    this.tabs.toArray().forEach(tab => (tab.active = false));
    this.hiddenTabs.forEach(tab => (tab.active = false));
    this.dynamicTabs.forEach(tab => (tab.active = false));

    // activate the tab the user has clicked on.
    hiddenTab.active = true;
    this.selectedHiddenTab = undefined;

    this.hiddenTabs.push(lastDynamicTab);
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

    if (this.dynamicTabs.length < 9 && this.hiddenTabs.length > 0) {
      const tab = this.hiddenTabs.pop();
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

  moduleChanged(event: any, module: any) {
    event.preventDefault();
    this.selectedModule = module.title;
    this.generalService.changeModule(module.id);
  }
}
