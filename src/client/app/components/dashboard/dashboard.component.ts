import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Chart } from 'chart.js';
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

    var linecolors = ['#ffffff','#abc271','#dbe4cb'];
    var lineData = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
      {
        data: [639, 465, 493, 478, 589, 632, 674],
        backgroundColor: linecolors[2],
        borderColor: linecolors[1],
        borderWidth: 2,
        pointBackgroundColor: linecolors[0]
      }]
    };

    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: lineData,
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

    var barcolors = ['#48a496','#b1e1da'];

    var chartData = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [{
        data: [589, 445, 483, 503, 689, 692, 634],
        backgroundColor: barcolors[0]
      },
      {
        data: [430, 245, 383, 403, 589, 692, 580],
        backgroundColor: barcolors[1]
      }]
    };

    this.chart2 = new Chart('canvas2', {
      type: 'bar',
  data: chartData,
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

    // var colors2 = ['#feea87','#878ab6','#4acab5','#f98153','#dc3545','#6c757d'];

    // var chartData2 = {
    //   labels: ["S", "M", "T", "W", "T", "F", "S"],
    //   datasets: [{
    //     data: [589, 445, 483, 503, 689, 692, 634],
    //     backgroundColor: colors2[0]
    //   },
    //   {
    //     data: [209, 245, 383, 403, 589, 692, 580],
    //     backgroundColor: colors2[1]
    //   },
    //   {
    //     data: [209, 245, 383, 403, 589, 692, 580],
    //     backgroundColor: colors2[2]
    //   },
    //   {
    //     data: [209, 245, 383, 403, 589, 692, 580],
    //     backgroundColor: colors2[3]
    //   }]
    // };


    var piedata = {
      labels: ["match1", "match2", "match3", "match4"],
      datasets: [
        {
          label: "TeamB Score",
          data: [20, 35, 40, 60, 50],
          backgroundColor: [
            "#feea87",
            "#878ab6",
            "#4acab5",
            "#f98153",
          ],
          borderColor: [
            "#feea87",
            "#878ab6",
            "#4acab5",
            "#f98153",
          ],
          borderWidth: [1, 1, 1, 1, 1]
        }
      ]
    };
  
    //options
    var pieoptions = {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "Pie Chart",
        fontSize: 18,
        fontColor: "#111"
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "#333",
          fontSize: 16
        }
      }
    };
  
  
    this.chart3 = new Chart('canvas3', {
      type: 'pie',
      data: piedata
     
    });

  
  }
}
