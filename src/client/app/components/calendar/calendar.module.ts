import { NgModule } from "@angular/core";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CalendarComponent } from "../calendar/calendar.component";
import { PersonalActivitiesComponent } from "../personalActivities/personalActivities.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [PersonalActivitiesComponent, CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarModule {}
