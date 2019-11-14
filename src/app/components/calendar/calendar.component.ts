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
  dateView: string;
  date = new Date();
  cards = [ {
    title: "Teste title",
    date: "13-11-2019",
    initialHour: "15:30",
    finalHour: "14:45",
    initialHourConverted: 13.5,
    finalHourConverted: 14.75,
    description:"BLA BLA BLA BLA BLA",
    type: 'Educação'
  },
  {
    title: "Teste title",
    date: "13-11-2019",
    initialHour: "15:30",
    finalHour: "14:45",
    initialHourConverted: 13.5,
    finalHourConverted: 14.75,
    description:"BLA BLA BLA BLA BLA",
    type: 'Educação'
  },
  {
    title: "Teste title",
    date: "13-11-2019",
    initialHour: "15:30",
    finalHour: "14:45",
    initialHourConverted: 13.5,
    finalHourConverted: 14.75,
    description:"BLA BLA BLA BLA BLA",
    type: 'Educação'
  },
  {
    title: "Teste title",
    date: "13-11-2019",
    initialHour: "15:30",
    finalHour: "14:45",
    initialHourConverted: 13.5,
    finalHourConverted: 14.75,
    description:"BLA BLA BLA BLA BLA",
    type: 'Educação'
  },
  {
    title: "Teste title",
    date: "13-11-2019",
    initialHour: "15:30",
    finalHour: "14:45",
    initialHourConverted: 13.5,
    finalHourConverted: 14.75,
    description:"BLA BLA BLA BLA BLA",
    type: 'Educação'
  },
  {
    title: "Teste title",
    date: "13-11-2019",
    initialHour: "15:30",
    finalHour: "14:45",
    initialHourConverted: 13.5,
    finalHourConverted: 14.75,
    description:"BLA BLA BLA BLA BLA",
    type: 'Educação'
  },

  {
    title: "Teste title titletitletitletitletitletitletitletitletitletitletitles",
    date: "13-11-2019",
    initialHour: "16:30",
    finalHour: "19:45",
    initialHourConverted: 16.5,
    finalHourConverted: 19.75,
    description:"BLA BLA BLA BLA BLA",
    type: 'Pesquisa'
  },
  {
    title: "Teste title title title title title title",
    date: "14-11-2019",
    initialHour: "15:30",
    finalHour: "17:45",
    initialHourConverted: 15.5,
    finalHourConverted: 17.75,
    description:"BLA BLA BLA BLA BLA",
    type: 'Usabilidade'
  }
  ];
  
  horas = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  events: CalendarEvent[] = [];
  constructor() { }

  ngOnInit() {
    this.defineDate();
  }
  value(params) {
    this.date = params;
    this.dateView =  params.getDate() + '-' + (params.getMonth() + 1) + '-' + params.getFullYear();
  }
  defineDate() {
    const date = new Date();
    this.dateView =  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }
  openModal(card) {
    console.log(card)
  }

}
