import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Username: any;
  constructor(public dialog: MatDialog, public auth: AuthenticationService, private router: Router) { }

  
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
    if(this.auth.isLoggedIn()){
      var user = this.auth.getUserDetails();
      this.Username = user.name
    }
  }

  openDialog(){
    
  }

  login(){
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/Login')
    }
  }
  logout(){
    this.auth.logout()
  }
}
