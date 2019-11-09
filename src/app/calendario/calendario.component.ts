import { Component, OnInit } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  constructor() { }

  ngOnInit() {
  }

}
