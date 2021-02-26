import { Component, OnInit, HostListener } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { DatasendService } from '../datasend.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticationService, private data: DatasendService) {    router.events
    .pipe(filter((routerEvent: Event) => routerEvent instanceof NavigationEnd))
    .subscribe(() => window.scrollTo(0, 0)); }

    
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

  quiz(id){
    this.data.setQuizType(document.getElementById(id).textContent)
    this.router.navigateByUrl('/Quiz')
  }
}
