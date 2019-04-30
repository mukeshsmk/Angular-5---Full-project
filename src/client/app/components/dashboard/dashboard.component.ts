import { Component, OnInit } from '@angular/core';

//dev
import { Chart } from 'chart.js';
//prod
//import Chart from 'chart.js';
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
  visibleOne : Boolean = false;
  visibleTwo : Boolean = true;
  
  
  chart1: Chart;
  chart2: Chart;
  chart3: Chart;
  constructor() {}

  ngOnInit() {

      //line chart 

    var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];
    var chartData = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
      {
        data: [639, 465, 493, 478, 589, 632, 674],
        backgroundColor: colors[3],
        borderColor: colors[1],
        borderWidth: 4,
        pointBackgroundColor: colors[1]
      }]
    };

    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });


    //bar chart 

    var colors1 = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];

    var chartData1 = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [{
        data: [589, 445, 483, 503, 689, 692, 634],
        backgroundColor: colors1[0]
      },
      {
        data: [209, 245, 383, 403, 589, 692, 580],
        backgroundColor: colors1[1]
      }]
    };

    this.chart2 = new Chart('canvas2', {
      type: 'bar',
  data: chartData1,
  options: {
    scales: {
      xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.8
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    }
  }
    });
  

   //pie chart 

    var colors2 = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];



    var piedata = {
      labels: ["match1", "match2", "match3", "match4", "match5"],
      datasets: [
        {
          label: "TeamB Score",
          data: [20, 35, 40, 60, 50],
          backgroundColor: [
            "#FAEBD7",
            "#DCDCDC",
            "#E9967A",
            "#F5DEB3",
            "#9ACD32"
          ],
          borderColor: [
            "#E9DAC6",
            "#CBCBCB",
            "#D88569",
            "#E4CDA2",
            "#89BC21"
          ],
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
