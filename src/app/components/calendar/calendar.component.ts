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
  obj = [ {
      hour: '09:00',
      style: '',
      agended: true,
      id:1
    },
     {
      hour: '10:00',
      style: '',
      agended: true,
      id:1
    },
    {
      hour: '11:00',
      style: 'green',
      agended: true,
      id:2
    },
  ];
  horas = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  events: CalendarEvent[] = [];
  constructor() { }

  ngOnInit() {
  }
  value(params) {
    this.date = params;
    let index =  params.getDate() + '-' + (params.getMonth() + 1) + '-' + params.getFullYear();
    console.log(this.obj)
  }

}
