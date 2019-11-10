import { Component, OnInit } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';
import { MaterialModule } from '../../material.module';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  view: string = 'month';

  viewDate: Date = new Date();
  date = new Date();

  events: CalendarEvent[] = [];
  constructor() { }

  ngOnInit() {
  }
  value(params) {
    this.date = params;
  }

}
