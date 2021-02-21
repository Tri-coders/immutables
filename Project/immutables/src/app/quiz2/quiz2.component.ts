import { Component, OnInit, HostListener } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-quiz2',
  templateUrl: './quiz2.component.html',
  styleUrls: ['./quiz2.component.scss']
})
export class Quiz2Component implements OnInit {

  items = [
    {value: 'main(){', disabled: true},
    {value: 'int x, y;', disabled: true},
    {value: 'x= 100;', disabled: true},
    {value: 'y= 200;', disabled: true},
    {value: 'z= x + y;', disabled: true},
    {value: 'print z;', disabled: true},
    {value: '}', disabled: true}
  ];
  items2 = [
    {value: 'x = y + 10', disabled: false},
    {value: 'y = x + 10', disabled: false},
    {value: 'x = x + 10', disabled: false},
    {value: 'y = y + 100/20 +5;', disabled: false},
  ];


  constructor(private auth: AuthenticationService, private router: Router) { }

  
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

  ngOnInit(): void {
  }
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
  

}
