import { Component, OnInit, HostListener,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  totalDays=0
  
  ///////////////////////FullScreen Exit////////////////////////
  @HostListener("document:fullscreenchange", []) 
  fullScreen() {
    if (document.fullscreenElement) {
        console.log(`Entered full-screen mode.`);
    } else {
        this.auth.logout()
    }
  }
  ////////////////////////////////////////////////////

  display = false;

  ngOnInit(): void {
  }

  toggleFab(){
    const Btns = document.querySelector(".btns");
    const add = document.getElementById("add");
    const remove = document.getElementById("remove");
    const btn = document.querySelector(".btns").querySelectorAll("a");
    Btns.classList.toggle("open");
    if (Btns.classList.contains("open")) {
      remove.style.display = "block";
      add.style.display = "none";
      btn.forEach((e, i) => {
        setTimeout(() => {
          var top = 50 * i;
          e.style.top = top + "px";
          //console.log(e);
        }, 100 * i);
      });
    } else {
      add.style.display = "block";
      remove.style.display = "none";
      btn.forEach((e, i) => {
        e.style.top = "0px";
      });
    }
  }

    onPress() {
    //this.display = true;

    //To toggle the component
    this.display = !this.display;
  }

  totaldaysChange(eve){
    this.totalDays=(<HTMLInputElement>document.getElementById("1")).value!=""?parseInt((<HTMLInputElement>document.getElementById("1")).value):0
    this.totalDays+=(<HTMLInputElement>document.getElementById("2")).value!=""?parseInt((<HTMLInputElement>document.getElementById("2")).value):0
    this.totalDays+=(<HTMLInputElement>document.getElementById("3")).value!=""?parseInt((<HTMLInputElement>document.getElementById("3")).value):0
    this.totalDays+=(<HTMLInputElement>document.getElementById("4")).value!=""?parseInt((<HTMLInputElement>document.getElementById("4")).value):0
    this.totalDays+=(<HTMLInputElement>document.getElementById("5")).value!=""?parseInt((<HTMLInputElement>document.getElementById("5")).value):0
    this.totalDays+=(<HTMLInputElement>document.getElementById("6")).value!=""?parseInt((<HTMLInputElement>document.getElementById("6")).value):0
    
  }

  submitResponse(){
    var planningdata=[this.auth.getSession(),0,0,0,0,0,0]
    planningdata[1]=(<HTMLInputElement>document.getElementById("1")).value!=""?parseInt((<HTMLInputElement>document.getElementById("1")).value):0
    planningdata[2]=(<HTMLInputElement>document.getElementById("2")).value!=""?parseInt((<HTMLInputElement>document.getElementById("2")).value):0
    planningdata[3]=(<HTMLInputElement>document.getElementById("3")).value!=""?parseInt((<HTMLInputElement>document.getElementById("3")).value):0
    planningdata[4]=(<HTMLInputElement>document.getElementById("4")).value!=""?parseInt((<HTMLInputElement>document.getElementById("4")).value):0
    planningdata[5]=(<HTMLInputElement>document.getElementById("5")).value!=""?parseInt((<HTMLInputElement>document.getElementById("5")).value):0
    planningdata[6]=(<HTMLInputElement>document.getElementById("6")).value!=""?parseInt((<HTMLInputElement>document.getElementById("6")).value):0
    
    this.auth.planning(planningdata)
      .subscribe(
        (data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            this.onPress()
          }
        },
        error => {
          console.error(error)
        }
      )
  }

  onToggle(event){
    var x = document.getElementsByClassName('history-data');
    var i = 0;

    if(event.checked == false){
      for(i = 0; i < x.length; i++)
        x[i].classList.add('hide')      
      }
    else
      for(i = 0; i < x.length; i++)
        x[i].classList.remove('hide')      
  }
  
}

