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

  ngOnInit(): void {}

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

  

  
}
