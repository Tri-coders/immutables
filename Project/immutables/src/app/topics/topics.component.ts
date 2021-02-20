import { Component, OnInit, HostListener } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService) {    router.events
    .pipe(filter((routerEvent: Event) => routerEvent instanceof NavigationEnd))
    .subscribe(() => window.scrollTo(0, 0)); }

    
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

}
