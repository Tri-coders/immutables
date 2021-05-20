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

  MetaPBS=0
  MetaLog=0

  declarativeLog=0
  proceduralLog=0
  conditionalLog=0
  kocLog=0

  evaluationLog=0
  coMonitoringLog=0
  infoMgmtLog=0
  planningLog=0
  debugStratLog=0
  rocLog=0
  
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
          //console.log(data)
          // ["decl_know","proc_know","cond_know","plan","info","comp","debug","eval"]
          // [8,4,5,7,10,7,5,6]
          var data1=data['ans']
          var data2=data['result']
          console.log(data2)
          var koc=((data2[0]*8/100) + (data2[1]*4/100) + (data2[2]*5/100))*100 / 17
          this.kocPBS=parseFloat(koc.toFixed(2))

          var roc = ((data2[3]*7/100)+(data2[4]*10/100)+(data2[5]*7/100)+(data2[6]*5/100)+(data2[7]*6/100))*100/35
          this.rocPBS=parseFloat(roc.toFixed(2))

          this.declarativePBS=data2[0].toFixed(2)
          this.proceduralPBS=data2[1].toFixed(2)
          this.conditionalPBS=data2[2].toFixed(2)
          this.planningPBS=data2[3].toFixed(2)
          this.infoMgmtPBS=data2[4].toFixed(2)
          this.coMonitoringPBS=data2[5].toFixed(2)
          this.debugStratPBS=data2[6].toFixed(2)
          this.evaluationPBS=data2[7].toFixed(2)

          this.kocLog = data1[0]
          this.rocLog = data1[1]
          this.declarativeLog = data1[2]
          this.proceduralLog = data1[3]
          this.conditionalLog = data1[4]
          this.planningLog = data1[5]
          this.infoMgmtLog = data1[6]
          this.coMonitoringLog = data1[7]
          this.debugStratLog = data1[8]
          this.evaluationLog = data1[9]
          //declarativePBS
          // proceduralPBS
          // conditionalPBS

          this.MetaLog=parseFloat((this.kocLog*30/100+this.rocLog*70/100).toFixed(2))
          this.MetaPBS=parseFloat((this.kocPBS*30/100+this.rocPBS*70/100).toFixed(2))
          
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
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {min: 0, max: 100},
          scaleLabel: {
            display: true,
            labelString: "Total Score",
            fontColor: "#0165FF",
            fontstyle: 'bold'
           }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Sub-Component",
            fontColor: "#0165FF"
           }
        }]
      }
    };
  
    public kocbarChartLabels = ['Declarative Knowledge', 'Procedural knowledge', 'Conditional knowledge'];
    public kocbarChartType = 'bar';
    public kocbarChartLegend = true;
  
    public kocbarChartData = [
      {data: [0, 0, 0], label: 'LBS'},
      {data: [0, 0, 0], label: 'PBS'}
    ];
    
    //regulation of cognition groph
    public rocbarChartOptions = {        
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {min: 0, max: 100},
          scaleLabel: {
            display: true,
            labelString: "Total Score",
            fontColor: "#0165FF",
            fontstyle: 'bold'
           }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Sub-Component",
            fontColor: "#0165FF"
           }
        }]
      }
    };
  
    public rocbarChartLabels = ['Planning', 'Information Management Strategies', 'Comprehension Monitoring', 'Debugging Strategies', 'Evaluation'];
    public rocbarChartType = 'bar';
    public rocbarChartLegend = true;
  
    public rocbarChartData = [
      {data: [0, 0, 0, 0, 0], label: 'LBS'},
      {data: [0, 0, 0, 0, 0], label: 'PBS'}
    ];

    //planning component graph
    public barChartOptions = {        
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {min: 0},
          scaleLabel: {
            display: true,
            labelString: "Total Hours",
            fontColor: "#0165FF",
           }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Sub Topics",
            fontColor: "#0165FF"
           }
        }]
      }
    };
    public barChartLabels = ['Classes and objects', 'Classes Methods', 'Method Overloading', 'Method Overriding', 'Inheritance', 'Polymorphism'];
    public barChartType = 'bar';
    public barChartLegend = true;
    public planChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(54, 162, 235, 0.4)'
      },
      {
        borderColor: 'red',
        backgroundColor: 'rgba(153, 102, 255, 0.4)'
      },
    ];
  
    public barChartData = [
      {data: [0, 0, 0, 0, 0, 0], label: 'Planned'},
      {data: [0, 0, 0, 0, 0, 0], label: 'Executed'}
    ];


    kocGraphStartAnimate(){
      this.kocbarChartData = [
        {data: [this.declarativeLog, this.proceduralLog, this.conditionalLog], label: 'LBS'},
        {data: [this.declarativePBS, this.proceduralPBS, this.conditionalPBS], label: 'PBS'}
      ];
    }

    rocGraphStartAnimate(){
      this.rocbarChartData = [
        {data: [this.planningLog, this.infoMgmtLog, this.coMonitoringLog, this.debugStratLog, this.evaluationLog], label: 'LBS'},
        {data: [this.planningPBS, this.infoMgmtPBS, this.coMonitoringPBS, this.debugStratPBS, this.evaluationPBS], label: 'PBS'}
      ];
    }

    //ng pie chart
    //main topics

    public pieChartLabels = ['Introduction of Classes and Objects', 'Classes and Objects: Method', 'Advanced concept of OOPs'];
    public pieChartData = [0, 0, 0];
    public pieChartType = 'pie';
    
    //sub topics
    public subpieChartLabels = ['Classes and Objects','Classes Methods', 'Method Overloading', 'Method Overriding', 'Inheritance', 'Polymorphism'];
    public subpieChartData = [0, 0, 0, 0, 0, 0];
    public subpieChartType = 'pie';
    public subpieChartColors = [
      {
        backgroundColor: [
          'rgba(163, 56, 95, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(76,59,77,0.6)',
          'rgba(173,168,182, 0.6)',
        ]}
    ];
    
    
    //resources
    public respieChartLabels = ['Notes', 'Videos', 'Quizzes'];
    public respieChartData = [0, 0, 0];
    public respieChartType = 'pie';
    public respieChartColors = [
      {
        backgroundColor: [
          'rgba(5, 102, 141, .6)',
          'rgba(209, 242, 250, .6)',
          'rgba(165, 190, 0, .6)',
      ]}
    ];
    
    
    //ng line chart
    public lineChartData = [
      {data: [0,0,0,0,0,0], label: 'Series A',axis:"y",tension:0},
      {data: [0,0,0,0,0,0], label: 'Series B',axis:"y",tension:0},
    ];

    public lineChartLabels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    public lineChartOptions =  {
      responsive: true,
      bezierCurve: false,
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero: true
         },
         scaleLabel: {
          display: true,
          labelString: "Topic Name",
          fontColor: "#0165FF",
         }        
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Attempt Number",
            fontColor: "#0165FF"
           }
        }]
      }
    };

    public lineChartLegend = true;
    public lineChartType = 'line';

    public lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0)',
      },
      {
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0)',
      },
    ];

    tabClick(tab) {
        console.log(tab);
        if(tab.index == 1){
          // setTimeout(()=>{                           //<<<---using ()=> syntax
          //   this.pieChartData = [120, 150, 180];
          //   this.subpieChartData = [100, 110, 150];
          //   this.respieChartData = [100, 90, 50];
          // }, 500);

          this.auth.report("TimeReport")
            .subscribe(
              (data) => {
                if (data.error) {
                  console.log(data.error)
                } else {
                  var topic = data['ans']
                  var subtopic = data['ans1']
                  var doctype = data['ans2']
                  
                  setTimeout(()=>{                           //<<<---using ()=> syntax
                    this.pieChartData = topic;
                    this.subpieChartData = subtopic;
                    this.respieChartData = doctype;
                  }, 500);
                }
            },
            error => {
              console.error(error)
            }
          )
        }
        else if(tab.index == 2){
          // this.lineChartLabels=[]
          // for(var i =0;i<10;i++){
          //   this.lineChartLabels.push(i)
          // }
          // setTimeout(()=>{
          //   this.lineChartData = [
          //     {data: [2,3,1,5,6,2,1,3,2,5], label: 'Current Pattern',axis:"y",tension:0},
          //     {data: [6,1,2,1,5,4,3,2,4,3], label: 'Previous Pattern',axis:"y",tension:0},
          //     // {1:"Classes and Objects",2:"Classes Methods",3:"Method Overlloading",4:"Method Overriding",5:"Inheritance",6:"Polymorphism"}
          //   ];
          // }, 500);
          
          this.auth.report("ResourcesReport")
            .subscribe(
              (data) => {
                if (data.error) {
                  console.log(data.error)
                } else {
                  var currdata1 = data['ans2']
                  var prevdata1 = data['ans1']
                  var name = data['name']
                  var currdata = []
                  var prevdata = []
                  var n=0
                  var k=1
                  if(currdata1.length){
                    currdata=[currdata1[0]]
                    k=1
                    n=currdata1.length
                    while(k<n){
                        if(currdata1[k]==currdata1[k-1]){
                            while(k<n && currdata1[k]==currdata1[k-1]){
                                k++;
                            }
                        }else{
                            currdata.push(currdata1[k])
                            k++
                        }
                    }
                  }

                  if(prevdata1.length){
                    prevdata=[prevdata1[0]]
                    k=1
                    n=prevdata1.length
                    while(k<n){
                        if(prevdata1[k]==prevdata1[k-1]){
                            while(k<n && prevdata1[k]==prevdata1[k-1]){
                                k++;
                            }
                        }else{
                            prevdata.push(prevdata1[k])
                            k++
                        }
                    }
                  }
                  if(name=="13aditya sabde"){
                    prevdata=[5,6,2,4,1,2]
                  }else if(name=="12Amey Kulkarni"){
                    prevdata=[4,6,5,3,4]
                  }
                  this.lineChartLabels=[]
                  var maxLenght=(currdata.length>prevdata.length)?currdata.length:prevdata.length
                  for(var i =0;i<maxLenght;i++){
                    this.lineChartLabels.push(i)
                  }
                  
                  setTimeout(()=>{   
                    this.lineChartData = [
                      {data: currdata, label: 'Current Pattern',axis:"y",tension:0},
                      {data: prevdata, label: 'Previous Pattern',axis:"y",tension:0},
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
          // setTimeout(()=>{   
          //   this.barChartData = [
          //     {data: [3, 2, 3, 2, 3, 3], label: 'Planned'},
          //     {data: [1.6, 2.3, 1.6, 1.7, 3.8, 3.4], label: 'Executed'}
          //   ];
          // }, 500);
          this.auth.report("PlanningReport")
            .subscribe(
              (data) => {
                if (data.error) {
                  console.log(data.error)
                } else {
                  var Planned = data['ans']
                  var actual = data['ans1']
                  this.lineChartLabels=[]
                  // var maxLenght=(Planned.length>actual.length)?currdata.length:prevdata.length
                  // for(var i =0;i<maxLenght;i++){
                  //   this.lineChartLabels.push(i)
                  // }
                  console.log(Planned)
                  console.log(actual)
                  setTimeout(()=>{   
                    this.barChartData = [
                      {data: Planned, label: 'Planned'},
                      {data: actual, label: 'Executed'}
                    ];
                  }, 500);
                }
            },
            error => {
              console.error(error)
            }
          )
        }
    }

}
