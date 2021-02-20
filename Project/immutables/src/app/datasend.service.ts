import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DatasendService{

  logs = [];
  type = ""; //Quiz Topic
  
  constructor(private auth: AuthenticationService) {  }

  ////////////////Quiz Topic///////////////
  setQuizType(Type){
    this.type = Type;
  }

  getQuizType(){
    return this.type;
  }
  ////////////////Quiz Topic///////////////



















  addlogs(data) {
    this.logs.push(data);
  }

  addlogsAtPosition(position,data){
    this.logs[position].push(data);
  }

  getlogs() {
    return this.logs;
  }

  getlength(){
    return this.logs.length;
  }

  clearlogs() {
    this.logs = [];
    return this.logs;
  }

  sendtoserverQuizScore(data){
    this.auth.logsdata(data)
        .subscribe(
          (data) => {
            if (data.error) {
              alert(data.error)
            } else {
              
              //alert(data)
            }
          },
          error => {
            console.error(error)
          }
        )
  }

  sendtoserver(){
    if(this.getlength()!=0){
      this.auth.logsdata(this.getlogs())
        .subscribe(
          (data) => {
            if (data.error) {
              alert(data.error)
            } else {
              this.clearlogs();
              //alert(data)
            }
          },
          error => {
            console.error(error)
          }
        )
    }
  }
}
