import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  opened = false;
  ngOnInit(): void {
  }
  togglesidebar(){
    this.opened = !this.opened;
  }
  sidefull(){

  }
}
