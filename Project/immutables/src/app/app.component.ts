import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'immutables';
  constructor(private auth: AuthenticationService, private router: Router) {  }
  
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

}
 