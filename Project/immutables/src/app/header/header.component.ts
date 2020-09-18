import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'immutables';
  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
  }


}
