
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ExcelImportComponent } from '../components/excel-import/excel-import.component';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
    moment.locale('pt-BR');
  }
}
