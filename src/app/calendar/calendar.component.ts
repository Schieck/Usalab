import { Component, OnInit } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  constructor() { }

  ngOnInit() {
  }
  value(params) {
    console.log(params);
    console.log('teste')
  }

}
