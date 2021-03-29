import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  iskocOpen = false
  isrocOpen = false
  
  constructor() { }

  ngOnInit(): void {
  }


  kocToggle(){
    if(this.iskocOpen)
      {
        document.getElementById("kocTheoryRepresentation").style.display = "";
        document.getElementById("kocGraphRepresentation").style.display = "none";
        document.getElementById("kocGraphIcon").style.color = "#7A7E81";
        this.iskocOpen = false
      }
      else
      {
        document.getElementById("kocTheoryRepresentation").style.display = "none"
        document.getElementById("kocGraphRepresentation").style.display = "";
        document.getElementById("kocGraphIcon").style.color = "#0165FF";
        this.kocGraphStartAnimate();
        this.iskocOpen = true
      }
    }

  rocToggle(){
    if(this.isrocOpen)
      {
        document.getElementById("rocTheoryRepresentation").style.display = "";
        document.getElementById("rocGraphRepresentation").style.display = "none";
        document.getElementById("rocGraphIcon").style.color = "#7A7E81";
        this.isrocOpen = false
      }
      else
      {
        document.getElementById("rocTheoryRepresentation").style.display = "none"
        document.getElementById("rocGraphRepresentation").style.display = "";
        document.getElementById("rocGraphIcon").style.color = "#0165FF";
        this.isrocOpen = true
      }
  }

  //google graph

  title = 'Population (in millions)';
  type = 'ColumnChart';
  data = [
     ["2012", 900],
     ["2013", 1000],
     ["2014", 1170],
     ["2015", 1250],
     ["2016", 1530],
     ["2017", 930],
     ["2018", 1230],
     ["2019", 1930],
     ["2020", 1330],
     ["2021", 1730]
  ];
  columns = ['Year', 'Asia'];
  options = { 
    colors:['#0165FF']
  };
  width = 800;
  height = 400;

  //ng charts
    public barChartOptions = {        
      scaleShowVerticalLines: false,
      responsive: true
    };
  
    public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType = 'bar';
    public barChartLegend = true;
  
    public barChartData = [
      {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
      {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series B'}
    ];


    kocGraphStartAnimate(){
      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
    
      this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.barChartData = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [48, 41, 20, 50, 90, 37, 30], label: 'Series C'}
      ];
    }

 
}
