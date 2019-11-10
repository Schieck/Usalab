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
    date: '01-01-1',
    '09:00': {
      hour: '09:00',
      type: 'pesquisa',
      agended: true,
    }
  }
  ];
  horas = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  events: CalendarEvent[] = [];
  constructor() { }

  ngOnInit() {
  }
  value(params) {
    this.date = params;
    let index =  params.getDate() + '-' + (params.getMonth() + 1) + '-' + params.getFullYear();
    this.obj.push({
      date: index,
      '09:00': {
        hour: '09:00',
        type: 'pesquisa',
        agended: true,
      }
    })
    console.log(this.obj)
  }

}
