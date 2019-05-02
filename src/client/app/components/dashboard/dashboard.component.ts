import { Component, OnInit } from '@angular/core';

//dev
//import { Chart } from 'chart.js';
//prod
import Chart from 'chart.js';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  chart1: Chart;
  chart2: Chart;
  chart3: Chart;

  ngOnInit() {
    //line chart

    let linecolors = ['#ffffff', '#abc271', '#dbe4cb'];
    let lineData = {
      labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      datasets: [
        {
          data: [639, 465, 493, 478, 589, 632, 674],
          backgroundColor: linecolors[2],
          borderColor: linecolors[1],
          borderWidth: 2,
          pointBackgroundColor: linecolors[0]
        }
      ]
    };

    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: lineData,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    });

    //bar chart

    let barcolors = ['#48a496', '#b1e1da'];

    let chartData = {
      labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      datasets: [
        {
          data: [589, 445, 483, 503, 689, 692, 634],
          backgroundColor: barcolors[0]
        },
        {
          data: [430, 245, 383, 403, 589, 692, 580],
          backgroundColor: barcolors[1]
        }
      ]
    };

    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              categoryPercentage: 0.8
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    });

    //pie chart
    let piedata = {
      labels: ['match1', 'match2', 'match3', 'match4'],
      datasets: [
        {
          label: 'TeamB Score',
          data: [20, 35, 40, 60, 50],
          backgroundColor: ['#feea87', '#878ab6', '#4acab5', '#f98153'],
          borderColor: ['#feea87', '#878ab6', '#4acab5', '#f98153'],
          borderWidth: [1, 1, 1, 1, 1]
        }
      ]
    };

    this.chart3 = new Chart('canvas3', {
      type: 'pie',
      data: piedata
    });
  }
}
