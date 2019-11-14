import { Component, OnInit } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';
import { MaterialModule } from '../../material.module';
import { registerLocaleData } from '@angular/common';
import { AuthenticationService, EssayService } from 'src/app/services';
import { first } from 'rxjs/operators';



@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  view: string = 'month';
  currentUser: User;
  currentUserSubscription: Subscription;
  essays: Essay[] = [];
  viewDate: Date = new Date();
  dateView: string;
  date = new Date();
  cards = [];
  
  horas = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  events: CalendarEvent[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private essayService: EssayService,
  ) { 
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.defineDate();
    this.loadAllEssays();
    this.createArrayCards();
  }
  value(params) {
    this.date = params;
    this.dateView =  params.getDate() + '-' + (params.getMonth() + 1) + '-' + params.getFullYear();
  }
  defineDate() {
    const date = new Date();
    this.dateView =  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }
  public loadAllEssays() {
    this.essayService.getAllNoType().pipe(first()).subscribe(essays => {
      this.essays = essays;
      this.createArrayCards();
    });
  }
  public createArrayCards() {
    this.essays.forEach(element => {
      this.cards.push({
        id: element.id,
        title: element.title,
        description: element.description,
        type: element.type,
        initialHour: element.fromTime,
        finalHour: element.toTime,
        date: this.convertDate(element.fromDate),
        initialHourConverted: this.convertTime(element.fromTime),
        finalHourConverted: this.convertTime(element.toTime),
      })
    });
    console.log(this.cards)
  }
  convertDate(date) {
    return date.substring(8,10) + '-' + date.substring(5,7) + '-' + date.substring(0,4)
  }
  convertTime(time) {
    let min = time.charAt(time.length-2);
    min = min/60;
    if(time.length == 4) {
      time = '0'+time;
    }
    return (time.substring(0,2) + min)/1;
  }



}