import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class GeneralService {
  emitter: EventEmitter<string> = new EventEmitter();
  public changeModule(type: string) {
    this.emitter.emit(type);
  }

  dashboardEvent: EventEmitter<string> = new EventEmitter();
  public openDashboard() {
    this.dashboardEvent.emit("Dashboard");
  }

  profileEvent: EventEmitter<string> = new EventEmitter();
  public openProfile() {
    this.profileEvent.emit("Profile");
  }

  calendarEvent: EventEmitter<string> = new EventEmitter();
  public openCalendar() {
    this.calendarEvent.emit("Calendar");
  }
}
