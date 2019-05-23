import { Component, OnInit } from "@angular/core";

//dev
import { Chart } from "chart.js";
//prod
// import Chart from "chart.js";
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: "sd-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  visibleOne: Boolean = false;
  visibleTwo: Boolean = true;

  chart1: Chart;
  chart2: Chart;
  chart3: Chart;
  chart4: Chart;

  ngOnInit() {
    //line chart

    let linecolors = ["#ffffff", "#abc271", "#dbe4cb"];
    let lineData = {
      labels: ["January", "Feburary", "March", "April", "May", "June"],
      datasets: [
        {
          data: [203, 156, 99, 251, 305, 247],
          backgroundColor: linecolors[2],
          borderColor: linecolors[1],
          borderWidth: 2,
          pointBackgroundColor: linecolors[0]
        }
      ]
    };

    this.chart1 = new Chart("canvas1", {
      type: "line",
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

    let barcolors = ["#48a496", "#b1e1da"];

    let chartData = {
      labels: ["January", "Feburary", "March", "April", "May", "June"],
      datasets: [
        {
          data: [456, 479, 324, 569, 702, 600],
          backgroundColor: barcolors[0]
        },
        {
          data: [364, 504, 605, 400, 345, 320],
          backgroundColor: barcolors[1]
        }
      ]
    };

    this.chart2 = new Chart("canvas2", {
      type: "bar",
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
      datasets: [
        {
          data: [20, 40, 10, 30],
          backgroundColor: ["#feea87", "#878ab6", "#4acab5", "#f98153"],
          borderColor: ["#feea87", "#878ab6", "#4acab5", "#f98153"],
          borderWidth: [1, 1, 1, 1, 1]
        }
      ]
    };

    this.chart3 = new Chart("canvas3", {
      type: "pie",
      data: piedata
    });

    this.chart4 = new Chart("canvas4", {
      type: "line",
      data: lineData,
      options: {
        elements: {
          line: {
            tension: 0 // disables bezier curves
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    });
  }
}
