import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener
} from '@angular/core';
import {
  AuthenticationService,
  pdfData
} from '../authentication.service';

import {
  Router
} from '@angular/router'

const dic = {}
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentComponent implements OnInit {


  credentials: pdfData = {
    name: ""
  }

  pdfPageNumber=1
  totalPages
  zoomPdf=1
  rotationPdf=0

  logsData=[]
  docEndTime
  docStartTime
  constructor(private auth: AuthenticationService, private router: Router) {}

  //////////////////////////PDFViewer//////////////////////////////////////////
  pdfSource = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key=="ArrowRight"){
      if(this.pdfPageNumber==this.totalPages){
        return
      }
      this.pdfPageNumber+=1
    }

    if(event.key=="ArrowLeft"){
      if(this.pdfPageNumber==1){
        return
      }
      this.pdfPageNumber-=1
    }
  }

  afterLoadComplete(pdf): void {
    this.totalPages = pdf.numPages;
  }
 
  zoomIn(){
    if(this.zoomPdf==2){
      return
    }
    this.zoomPdf+=0.5
  }
  resetZoom(){
    this.zoomPdf=1
  }
  rotate(){
    this.rotationPdf+=90
  }
  Next(){
    console.log(this.totalPages)
    if(this.pdfPageNumber==this.totalPages){
      return
    }
    this.pdfPageNumber+=1
  }
  Previous(){
    if(this.pdfPageNumber==1){
      return
    }
    this.pdfPageNumber-=1
  }
  jumpPagePdf(evt){
    if(evt.target.value<=this.totalPages)
      this.pdfPageNumber=evt.target.value
    return
    }
  //////////////////////////PDFViewer//////////////////////////////////////////
  
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
  onToggle(event){
    var x = document.getElementById("mydiv")
    var y = document.getElementById("mydivheader")

    if(event.checked == false){
      x.style.position = "static";
      y.style.display = "none";
      console.log(x.style.position, ": Dont drag")
    }
    else{
      x.style.position = "absolute";
      y.style.display = "block";
      console.log(x.style.position, ": Drag")
    }
  }

  ngOnInit() {
    console.log(this.pdfSource)
    if(Object.keys(dic).length === 0){
      this.from_csv()
    }
    this.drag()
  }

  updatePdfName(id) {
    
    var f = document.getElementById('videoFrame')
    if(this.pdfSource=="" && f['src']==""){
      this.logsData.push(this.auth.getSession())
      this.logsData.push("subtopic")
      this.logsData.push(document.getElementById(id).innerHTML)
      this.logsData.push("doc2")
      this.logsData.push("flag")
      this.docStartTime = new Date()
      this.docStartTime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      this.logsData.push(this.docStartTime)

    }else{
      this.logsData[3]=document.getElementById(id).innerHTML
      this.logsData[4]="1"
      var current = new Date()
      this.docEndTime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      this.logsData.push(this.docEndTime)
      this.logsData.push(current.getTime() - this.docStartTime.getTime())
      this.auth.logsdata(this.logsData);

    }
    this.pdfSource = document.getElementById(id).innerHTML;
    // this.auth.pdfname(this.credentials).subscribe(
    //   (data) => {
    //     var f = document.getElementById('Frame')
    //     f['src'] = f['src']
    //   },
    //   error => {
    //     alert("problem")
    //   })
  }

  from_csv() {

    this.auth.videoname().subscribe(
      (data) => {
        if (data.error) {
          alert(data.error)
        } else {
            for(var i=0;i<data.length;i++){
              try{
                dic[data[i]["name"]] = data[i]["link"]
              }catch{
                continue
              }
            }
        }
      },
      error => {

        console.error(error)
      }
    )
  }

  updateVideoName(id){
    if(this.pdfSource=="" && f['src']==""){
      this.logsData.push(this.auth.getSession())
      this.logsData.push("subtopic")
      this.logsData.push(document.getElementById(id).innerHTML)
      this.logsData.push("doc2")
      this.logsData.push("flag")
      this.docStartTime = new Date()
      var startime = this.docStartTime.getHours()+":"+this.docStartTime.getMinutes()+":"+this.docStartTime.getSeconds();
      this.logsData.push(startime)
    }else{
      
      this.auth.logsdata(this.logsData)
    }
    id=document.getElementById(id).innerHTML
    var f = document.getElementById('videoFrame')
    try{
      f['src'] = dic[id]
    }catch{
      f['src'] = ""
    }
  }

  //#######################################Video#####################################

  //
  drag() {
    dragElement(document.getElementById("mydiv"));

    function dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
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
