import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { UserDairyComponent } from './user-dairy.component';
import { PersonalActivitiesComponent } from '../personalActivities/personalActivities.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [ PersonalActivitiesComponent, UserDairyComponent ],
  exports: [ UserDairyComponent ]
})
export class UserDairyModule {}
