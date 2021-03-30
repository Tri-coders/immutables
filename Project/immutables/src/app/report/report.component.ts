import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { ChartDataSets, ChartOptions } from 'chart.js';

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
        this.rocGraphStartAnimate();
        this.isrocOpen = true
      }
  }

  //ng bar chart charts
  //knwoledge of cognition graph
    public kocbarChartOptions = {        
      scaleShowVerticalLines: false,
      responsive: true
    };
  
    public kocbarChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public kocbarChartType = 'bar';
    public kocbarChartLegend = true;
  
    public kocbarChartData = [
      {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
      {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series B'}
    ];
    
    //regulation of cognition groph
    public rocbarChartOptions = {        
      scaleShowVerticalLines: false,
      responsive: true
    };
  
    public rocbarChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public rocbarChartType = 'bar';
    public rocbarChartLegend = true;
  
    public rocbarChartData = [
      {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
      {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series B'}
    ];

    //planning component graph
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
      this.kocbarChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
    
      this.kocbarChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      this.kocbarChartType = 'bar';
      this.kocbarChartLegend = true;
      this.kocbarChartData = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [48, 41, 20, 50, 90, 37, 30], label: 'Series C'}
      ];
    }

    rocGraphStartAnimate(){
      this.rocbarChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
    
      this.rocbarChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      this.rocbarChartType = 'bar';
      this.rocbarChartLegend = true;
      this.rocbarChartData = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [48, 41, 20, 50, 90, 37, 30], label: 'Series C'}
      ];
    }

    //ng pie chart

    public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
    public pieChartData = [0, 0, 0, 0];
    public pieChartType = 'pie';

    //ng line chart
    public lineChartData = [
      {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A'},
      {data: [0, 0, 0, 0, 0, 0, 0], label: 'Series B'}
    ];

    public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions =  {
      responsive: true,
    };

    public lineChartLegend = true;
    public lineChartType = 'line';

    public lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.0)',
      },
      {
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.0)',
      },
    ];

    tabClick(tab) {
        console.log(tab);
        if(tab.index == 1){
          setTimeout(()=>{                           //<<<---using ()=> syntax
            this.pieChartData = [120, 150, 180, 90];
          }, 500);
        }
        else if(tab.index == 2){
          setTimeout(()=>{   
          this.lineChartData = [
            {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
            {data: [85, 48, 66, 52, 78, 90, 85], label: 'Series B'}
          ];
        }, 500);
        }
        else if(tab.index == 3){
          setTimeout(()=>{   
          this.barChartData = [
            {data: [32, 67, 23, 98, 45, 76, 87], label: 'Series A'},
            {data: [56, 23, 76, 87, 98, 34, 78], label: 'Series B'}
          ];
        }, 500);
        }
    }

}
