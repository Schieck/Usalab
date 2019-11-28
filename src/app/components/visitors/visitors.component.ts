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
	this.mountChart();

	this.dialog.afterAllClosed.subscribe(() => {
		this.mountChart();
	});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExcelImportComponent, {
      width: '300px'
    });
  }

  mountChart(){
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
						JSON.parse(localStorage["visits"])["19"]["8"],
						JSON.parse(localStorage["visits"])["19"]["9"],
						JSON.parse(localStorage["visits"])["19"]["10"],
						JSON.parse(localStorage["visits"])["19"]["11"],
						JSON.parse(localStorage["visits"])["19"]["12"]
					],
					fill: false,
				}, {
					label: '2018',
					fill: false,
					backgroundColor: "#419c79",
					borderColor: "#419c79",
					data: [
						JSON.parse(localStorage["visits"])["18"]["8"],
						JSON.parse(localStorage["visits"])["18"]["9"],
						JSON.parse(localStorage["visits"])["18"]["10"],
						JSON.parse(localStorage["visits"])["18"]["11"],
						JSON.parse(localStorage["visits"])["18"]["12"]
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
}
