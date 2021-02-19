import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'immutables';
  constructor(public auth: AuthenticationService, private router: Router) { }

  
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
  }

  ele = document.documentElement
  logout(){
    this.auth.logout()
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

}
