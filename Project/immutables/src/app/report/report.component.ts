import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { AuthenticationService } from '../authentication.service';
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

  declarativePBS=0
  proceduralPBS=0
  conditionalPBS=0
  kocPBS=0

  evaluationPBS=0
  coMonitoringPBS=0
  infoMgmtPBS=0
  planningPBS=0
  debugStratPBS=0
  rocPBS=0
  
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.setValuesPBS()
  }

  setValuesPBS(){
    this.auth.report("PBSscore")
    .subscribe(
      (data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          console.log(data)
          // ["decl_know","proc_know","cond_know","plan","info","comp","debug","eval"]
          // [8,4,5,7,10,7,5,6]
          var koc=(((data[0]*8/100) + (data[1]*4/100) + (data[2]*5/100) )*100/17)
          this.kocPBS=parseFloat(koc.toFixed(2))

          var roc = (data[3]*7/100)+(data[4]*10/100)+(data[5]*7/100)+(data[6]*5/100)+(data[7]*6/100)
          this.rocPBS=parseFloat(roc.toFixed(2))
          
          this.declarativePBS=data[0].toFixed(2)
          this.proceduralPBS=data[1].toFixed(2)
          this.conditionalPBS=data[2].toFixed(2)
          this.planningPBS=data[3].toFixed(2)
          this.infoMgmtPBS=data[4].toFixed(2)
          this.coMonitoringPBS=data[5].toFixed(2)
          this.debugStratPBS=data[6].toFixed(2)
          this.evaluationPBS=data[7].toFixed(2)

          //declarativePBS
          // proceduralPBS
          // conditionalPBS

          
          //alert(data)
        }
      },
      error => {
        console.error(error)
      }
    )
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
      {data: [0,0,0,0,0,0], label: 'Series A',axis:"y"}
    ];

    public lineChartLabels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
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
          
          this.auth.report("ResourcesReport")
            .subscribe(
              (data) => {
                if (data.error) {
                  console.log(data.error)
                } else {
                  this.lineChartLabels=[]
                  for(var i =0;i<data.length;i++){
                    this.lineChartLabels.push(i)
                  }
                  setTimeout(()=>{   
                    this.lineChartData = [
                      {data: data, label: 'Series A',axis:"y"}
                      // {1:"Classes and Object",2:"Classes Methods",3:"Method Overlloading",4:"Method Overriding",5:"Inheritance",6:"Polymorphism"}
                    ];
                  }, 500);
                }
            },
            error => {
              console.error(error)
            }
          )
          
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
