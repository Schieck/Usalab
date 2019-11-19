import { Component, OnInit, Inject } from '@angular/core';

import { CalendarEvent } from 'angular-calendar';
import { MaterialModule } from '../../material.module';
import { registerLocaleData } from '@angular/common';
import { AuthenticationService, EssayService } from 'src/app/services';
import { first } from 'rxjs/operators';
import { User, Essay } from 'src/app/models';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EssayDialogComponent } from '../essay-dialog/essay-dialog.component';


export interface DialogData {
  animal: string;
  name: string;
}
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
  showNotExist: boolean;
  animal: string;
  name: string;
  events: CalendarEvent[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private essayService: EssayService,
    public dialog: MatDialog
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

    this.cards.sort((a,b) => (a.initialHourConverted > b.initialHourConverted) ? 1 : ((b.initialHourConverted > a.initialHourConverted) ? -1 : 0));
  }
  convertDate(date) {
    return date.substring(8,10) + '-' + date.substring(5,7) + '-' + date.substring(0,4)
  }

  convertTime(time) {
    var time = time.split(':');
    return (time[0]*60 +  time[1]);
  }
  verifyExist() {
    this.showNotExist = true;
    this.essays.forEach(element => {
      if(this.convertDate(element.fromDate) == this.dateView) {
        this.showNotExist = false;
      }
    });
    return this.showNotExist;
  }
  openDialog(param): void {
    console.log(param)
    const dialogRef = this.dialog.open(EssayDialogComponent, {
      width: '350px',
      data: {card: param}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  
}