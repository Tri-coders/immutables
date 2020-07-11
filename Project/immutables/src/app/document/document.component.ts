import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  pdfName = "";

  constructor() { }

  ngOnInit(): void {
  }

  updatePdfName() {
    this.pdfName = document.getElementById("1").innerHTML;
    console.log(this.pdfName);
  }

  updatePdfName2() {
    this.pdfName = document.getElementById("2").innerHTML;
    console.log(this.pdfName);
  }

}
