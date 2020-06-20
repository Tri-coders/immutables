import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleFab(){
    const Btns = document.querySelector(".btns");
    const add = document.getElementById("add");
    const remove = document.getElementById("remove");
    const btn = document.querySelector(".btns").querySelectorAll("a");
    Btns.classList.toggle("open");
    if (Btns.classList.contains("open")) {
      remove.style.display = "block";
      add.style.display = "none";
      btn.forEach((e, i) => {
        setTimeout(() => {
          var top = 50 * i;
          e.style.top = top + "px";
          console.log(e);
        }, 100 * i);
      });
    } else {
      add.style.display = "block";
      remove.style.display = "none";
      btn.forEach((e, i) => {
        e.style.top = "0px";
      });
    }
  }

}
