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

  // togglesidebar(){
  //   this.opened = !this.opened;
  // }  

  onClose(){
    this.opened = false;

    setTimeout( () => { var x = document.getElementById("ngs");
    x.style.width = "35px"; }, 250 );

  }

  onOpen(){
    this.opened = true;
    var x = document.getElementById("ngs");
    x.style.width = "100%";
  }

}
