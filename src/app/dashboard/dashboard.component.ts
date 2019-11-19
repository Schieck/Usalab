
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ExcelImportComponent } from '../components/excel-import/excel-import.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExcelImportComponent, {
      width: '350px'
    });
  }
}
