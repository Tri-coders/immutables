import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { AuthenticationService } from '../authentication.service';

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

  declarativePBS
  proceduralPBS
  conditionalPBS

  evaluationPBS
  coMonitoringPBS
  infoMgmtPBS
  planningPBS
  debugStratPBS
  
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.setValuesPBS()
  }

  setValuesPBS(){
    this.auth.report()
    .subscribe(
      (data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          console.log(data)
          // ["decl_know","proc_know","cond_know","plan","info","comp","debug","eval"]
          this.declarativePBS=data[0].toFixed(2).toString()+"%"
          this.proceduralPBS=data[1].toFixed(2).toString()+"%"
          this.conditionalPBS=data[2].toFixed(2).toString()+"%"
          this.planningPBS=data[3].toFixed(2).toString()+"%"
          this.infoMgmtPBS=data[4].toFixed(2).toString()+"%"
          this.coMonitoringPBS=data[5].toFixed(2).toString()+"%"
          this.debugStratPBS=data[6].toFixed(2).toString()+"%"
          this.evaluationPBS=data[7].toFixed(2).toString()+"%"
          
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

  //graph

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
}
