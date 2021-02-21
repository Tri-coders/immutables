import { Component, OnInit, HostListener } from '@angular/core';
import {DatasendService} from '../datasend.service';
import {Router} from '@angular/router'
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit { 
  constructor(private data: DatasendService, private router: Router, private auth: AuthenticationService) { } 
  
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

  opened = false;
  co_opened = false;
  cm_opened = false;
  aoop_opened = false;
  ngOnInit(): void {
  }

  togglesidebar(){
    if (this.opened) {
      console.log("opened");
      this.onClose();
    } else {
      console.log("Closed");
      this.onOpen();
    }
  }  

  onClose(){
    this.opened = false;

    setTimeout( () => { var x = document.getElementById("ngs");
    //x.style.transform = "translateX(" + (-300) + "px) ";
    x.style.width = "35px";
    
    //y.style.marginLeft = "-25px";

    }, 250 );
    var y = document.getElementById("open-sidebar");
    y.style.transform = "translateX(" + (0) + "px) ";
    
    var arrowOpen = document.getElementById("arrow-Open");
    arrowOpen.style.display = "";
    var arrowClose = document.getElementById("arrow-Close");
    arrowClose.style.display = "none";
    
  }

  onOpen(){
    this.opened = true;
    var x = document.getElementById("ngs");
    //x.style.transform = "translateX(" + (300) + "px) ";
    x.style.width = "100%";

    var y = document.getElementById("open-sidebar");
    y.style.transform = "translateX(" + (300) + "px) ";
    //y.style.marginLeft = "275px";
    
    var arrowOpen = document.getElementById("arrow-Open");
    arrowOpen.style.display = "none";
    var arrowClose = document.getElementById("arrow-Close");
    arrowClose.style.display = "";

  }

  quiz(type){
    this.data.setQuizType(type);
    this.router.navigate(['/Quiz'])
  }

}
