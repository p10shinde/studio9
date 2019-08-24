import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-center-report',
  templateUrl: './center-report.component.html',
  styleUrls: ['./center-report.component.less']
})
export class CenterReportComponent implements OnInit {
  public options: any = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        credit: false,
        type: 'pie'
    },
    credits: {
      enabled: false
    },
    title: {
        text: 'Payment method'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        }
    },
    series: [{
        name: 'Payment type',
        colorByPoint: true,
        data: [{
            name: 'paytm',
            y: 1,
            sliced: true,
            selected: true
        }, {
            name: 'googlepay',
            y: 2
        }, {
            name: 'phonepe',
            y: 1
        }, {
            name: 'BHIM',
            y: 2
        }, {
            name: 'cash',
            y: 1
        }]
    }]
  };
  constructor() { }

  ngOnInit() {

    // Highcharts.chart('container', this.options);
  }

}
