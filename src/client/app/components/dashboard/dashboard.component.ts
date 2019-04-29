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
  
  @ViewChild('myChart') myChartRef: ElementRef;
  constructor() { }

  ngOnInit() {
    let ctx = document.getElementById('myChart')

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [7, 10, 3, 5, 2, 3],
      fill: true,
      backgroundColor: 'orange',
      borderColor: 'green',
      pointBorderColor: 'red',
      pointBackgroundColor: 'red'
    }]
  },
  options: {
    pan: {
      enabled: true,
      mode: 'x',     
    },
    zoom: {
      enabled: true,         
      mode: 'x',     
    },
    responsive: true
  }
})
  }
 
}
