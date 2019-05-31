import { Component, OnInit, Input } from "@angular/core";

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from "angular-calendar";
import { HttpClient } from "@angular/common/http";
import { GeneralService } from "../../shared/services/GeneralService";
import { ApiService } from "../../shared/services/ApiServices";

/**
 * This class represents the lazy loaded UserDairyComponent.
 */
@Component({
  selector: "sd-user-dairy",
  templateUrl: "user-dairy.component.html",
  styleUrls: ["user-dairy.component.css"]
})
export class UserDairyComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  userData: any;
  loaderOne: Boolean = false;
  personal_events: any;
  events: CalendarEvent[];

  constructor(
    private http: HttpClient,
    public generalService: GeneralService,
    public apiService: ApiService
  ) {}

  setView(view: CalendarView) {
    this.view = view;
  }
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.getEvents();
    this.generalService.refreshCalendarEvent.subscribe((type: string) => {
      console.log(type);
      this.getEvents();
    });
  }
  getEvents() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    if (this.userData) {
      this.loaderOne = true;
      const params = {
        assigned_to_user__c: this.userData.user_sfid
      };
      this.http
        .post<{ success: object }>(this.apiService.personal_eventsUrl, params)
        .subscribe((response: any) => {
          let tempEvents = [];
          if (response.success) {
            this.personal_events = response.success;
            for (let i = 0; i < this.personal_events.length; i++) {
              let temparray;
              if (this.personal_events[i].type__c == "Event") {
                temparray = {
                  start: new Date(this.personal_events[i].start_date__c),
                  end: new Date(this.personal_events[i].end_date__c),
                  title: "Event/" + this.personal_events[i].subject__c,
                  color: "eventBg",
                  allDay: this.personal_events[i].all_day_flag__c
                    ? this.personal_events[i].all_day_flag__c
                    : false,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: false
                };
                tempEvents.push(temparray);
              } else if (this.personal_events[i].type__c == "Task") {
                temparray = {
                  start: new Date(this.personal_events[i].end_date__c),
                  end: new Date(this.personal_events[i].end_date__c),
                  title: "Task/" + this.personal_events[i].subject__c,
                  color: "taskBg",
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: false
                };
                tempEvents.push(temparray);
              } else if (this.personal_events[i].type__c == "Log a Call") {
                temparray = {
                  start: new Date(this.personal_events[i].start_date__c),
                  end: new Date(this.personal_events[i].end_date__c),
                  title: "Log a Call/" + this.personal_events[i].subject__c,
                  color: "callBg",
                  resizable: {
                    beforeStart: true,
                    afterEnd: true
                  },
                  draggable: false
                };
                tempEvents.push(temparray);
              }
            }
            this.events = tempEvents;
            this.loaderOne = false;
          }
        });
    }
  }
}
