import { Component } from '@angular/core';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

/**
 * This class represents the lazy loaded UserDairyComponent.
 */
@Component({
  selector: 'sd-user-dairy',
  templateUrl: 'user-dairy.component.html',
  styleUrls: [ 'user-dairy.component.css' ]
})
export class UserDairyComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }
}
