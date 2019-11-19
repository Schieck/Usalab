import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as ChartJS from 'chart.js'
import { ExcelImportComponent } from '../excel-import/excel-import.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss']
})

export class VisitorsComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    var ctx = document.getElementById('chartContainer');

    var MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    var config = {
			type: 'line',
			data: {
				labels: ['Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				datasets: [{
					label: '2019',
					backgroundColor: "#7e9c41",
					borderColor: "#7e9c41",
					data: [
						12,
						24,
						0
					],
					fill: false,
				}, {
					label: '2018',
					fill: false,
					backgroundColor: "#419c79",
					borderColor: "#419c79",
					data: [
						2,
						4,
						9
					],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Visitas'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true		
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Visitas'
						}
					}]
				}
			}
    };
    
    let myChart = new Chart(ctx, config);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExcelImportComponent, {
      width: '300px'
    });
  }

}
