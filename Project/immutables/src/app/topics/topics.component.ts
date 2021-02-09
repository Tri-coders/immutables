import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  constructor( router: Router) {    router.events
    .pipe(filter((routerEvent: Event) => routerEvent instanceof NavigationEnd))
    .subscribe(() => window.scrollTo(0, 0)); }

  ngOnInit(): void {
  }

}
