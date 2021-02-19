import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router'
import { Key } from 'protractor';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Username: any;
  constructor(public dialog: MatDialog, public auth: AuthenticationService, private router: Router) { }

  
  ///////////////////////FullScreen Exit////////////////////////
  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if ((event.key === "F11" || event.key==="Escape") && this.auth.isLoggedIn()) {
      //console.log("F11")
      this.auth.logout()
      this.router.navigateByUrl('/Home')
    }
  }
  ////////////////////////////////////////////////////

  

  ngOnInit(): void {
  
    if(this.auth.isLoggedIn()){
      
    }
  }

  openDialog(){
    
  }

  
}
