import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthenticationService,
  pdfData
} from '../authentication.service';
import {
  Router
} from '@angular/router'

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {


  credentials: pdfData = {
    name: ""
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.drag()
  }

  updatePdfName(id) {
    this.credentials.name = document.getElementById(id).innerHTML;
    console.log(this.credentials.name);
    this.auth.pdfname(this.credentials).subscribe(
      (data) => {
        var f = document.getElementById('Frame')
        f['src'] = f['src']
      },
      error => {
        alert("problem")
      })
  }

  updatePdfName2() {
    this.credentials.name = document.getElementById("2").innerHTML;
    console.log(this.credentials.name);
  }

  //#######################################Video#####################################

  //
drag(){
  dragElement(document.getElementById("mydiv"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
}
  
}
