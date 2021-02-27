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
import { DatasendService } from '../datasend.service';

const dic = {
  
}
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentComponent implements OnInit {

  dic2={
    "11": "https://www.youtube.com/watch?v=6V0CkJbLDCQ",
  "12": "https://www.youtube.com/watch?v=6V0CkJbLDCQ",
  "13": "https://www.youtube.com/watch?v=6V0CkJbLDCQ",
  "14": "https://www.youtube.com/watch?v=6V0CkJbLDCQ",
  "15": "https://www.youtube.com/watch?v=6V0CkJbLDCQ",
  "16": "https://www.youtube.com/watch?v=6V0CkJbLDCQ"
  }
  dicForQuiz={
    "1": "Classes and Objects",
    "2": "Classes Methods",
    "3": "Method Overloading",
    "4": "Method Overriding",
    "5": "Inheritance",
    "6": "Polymorphism"
  }

  dicForDoc={
    "Introduction.pdf":["Introduction of Classes and Objects","Classes and Objects"],
    "Classes Variables.pdf":["Introduction of Classes and Objects","Classes and Objects"],
    "Initialization Block.pdf":["Introduction of Classes and Objects","Classes and Objects"],
    "Methods.pdf":["Classes and Objects: Method","Classes Methods"],
    "Constructor.pdf":["Classes and Objects: Method","Classes Methods"],
    "Method Overriding.pdf":["Classes and Objects: Method","Method Overriding"],
    "Method Overloading.pdf":["Classes and Objects: Method","Method Overloading"],
    "Inheritance.pdf":["Advanced concept of OOPs","Inheritance"],
    "Polymorphism.pdf":["Advanced concept of OOPs","Polymorphism"]
  }
  dicForVideo={
    "Video1":["Introduction of Classes and Objects","Classes and Objects"],
    "Video Materials": ["Advanced concept of OOPs","Inheritance"]
  }

  credentials: pdfData = {
    name: ""
  }

  pdfPageNumber=1
  totalPages
  zoomPdf=1
  rotationPdf=0

  logsForResources=[]
  docEndTime
  docStartTime
  pointerForDoc=[]
  pointerForVideo=[]

  logsForDocument=[]
  pageStartTime

  logsForTopicSwitch=[]

  logsForTopicTime = []
  subtopic=""
  startTopicTime
  constructor(private auth: AuthenticationService, private router: Router, private data: DatasendService) {}

  //////////////////////////PDFViewer//////////////////////////////////////////
  pdfSource = ""

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
    var current = new Date
    var time = current.getTime()
    this.logsForDocument[this.logsForDocument.length - 1].push(time-this.pageStartTime)
    var temp = [this.auth.getSession(),this.logsForDocument[this.logsForDocument.length - 1][1],this.pdfPageNumber]
    var current = new Date
    this.pageStartTime = current.getTime()
    this.logsForDocument.push(temp)

  }
  Previous(){
    if(this.pdfPageNumber==1){
      return
    }
    this.pdfPageNumber-=1
    var current = new Date
    var time = current.getTime()
    this.logsForDocument[this.logsForDocument.length - 1].push(time-this.pageStartTime)
    var temp = [this.auth.getSession(),this.logsForDocument[this.logsForDocument.length - 1][1],this.pdfPageNumber]
    var current = new Date
    this.pageStartTime = current.getTime()
    this.logsForDocument.push(temp)
  }
  jumpPagePdf(evt){
    if(evt.target.value<=this.totalPages && evt.target.value>0){
      this.pdfPageNumber=evt.target.value
      var current = new Date
      var time = current.getTime()
      this.logsForDocument[this.logsForDocument.length - 1].push(time-this.pageStartTime)
      var temp = [this.auth.getSession(),this.logsForDocument[this.logsForDocument.length - 1][1],this.pdfPageNumber]
      var current = new Date
      this.pageStartTime = current.getTime()
      this.logsForDocument.push(temp)
    }
    
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

  ngOnDestroy(){
    var current = new Date
    var time = current.getTime()
    if(this.logsForDocument.length){
      this.logsForDocument[this.logsForDocument.length - 1].push(time-this.pageStartTime)
      this.logsForDocument.push("document")
      this.auth.logsdata(this.logsForDocument)
          .subscribe(
            (data) => {
              if (data.error) {
                alert(data.error)
              } else {
                this.logsForDocument=[]
                //alert(data)
              }
            },
            error => {
              console.error(error)
            }
          )
    }

    if(this.pointerForDoc.length || this.pointerForVideo.length){
      var current = new Date
      var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      
      if(this.pointerForDoc.length){
        this.logsForResources[this.logsForResources.length-1][3]="NAN"
        if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
          this.logsForResources[this.logsForResources.length-1][4]="2"
          this.logsForResources[this.pointerForDoc[0]].push(endtime)
          this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
        }
      }
      if(this.pointerForVideo.length){
        this.logsForResources[this.logsForResources.length-1][3]="NAN"
        if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
          this.logsForResources[this.logsForResources.length-1][4]="4"
          this.logsForResources[this.pointerForVideo[0]].push(endtime)
          this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
        }
        }
    }else{
      var temp = [this.auth.getSession(),this.data.getQuizType(),this.data.getQuizType()+" Quiz"]
      this.logsForResources.push(temp)
    }
    this.logsForResources.push("Resources")
    this.auth.logsdata(this.logsForResources)
    .subscribe(
      (data) => {
        if (data.error) {
          alert(data.error)
        } else {
          this.logsForResources=[]
          //alert(data)
        }
      },
      error => {
        console.error(error)
      }
    )

    ////////////////Topic_time csv////////////////////////
    
    if(this.startTopicTime!=undefined){
      var n =new Date()
      var endTime = n.getTime()
      this.logsForTopicTime[this.logsForTopicTime.length-1][3]=endTime
      this.logsForTopicTime[this.logsForTopicTime.length-1][4]=endTime-this.startTopicTime
    }
    this.logsForTopicTime.push("ToicTimeLog")
    this.auth.logsdata(this.logsForTopicTime)
    .subscribe(
      (data) => {
        if (data.error) {
          alert(data.error)
        } else {
          this.logsForTopicTime=[]
          //alert(data)
        }
      },
      error => {
        console.error(error)
      }
    )
    ////////////////Topic_time csv////////////////////////
    
  }

  updatePdfName(id) {
    
    var f = document.getElementById('videoFrame')
    
    /////////////////Document Csv//////////////////////
    var temp=[]
    if(this.pdfSource==""){
      temp = [this.auth.getSession(),document.getElementById(id).textContent,this.pdfPageNumber]
      var current = new Date
      this.pageStartTime = current.getTime()
      this.logsForDocument.push(temp)
    }else{
      var current = new Date
      var time = current.getTime()
      this.logsForDocument[this.logsForDocument.length - 1].push(time-this.pageStartTime)
      this.pdfPageNumber=1
      temp = [this.auth.getSession(),document.getElementById(id).textContent,this.pdfPageNumber]
      var current = new Date
      this.pageStartTime = current.getTime()
      this.logsForDocument.push(temp)
    }
    
    /////////////////Document Csv//////////////////////
    /////////////////Resources Csv///////////////////////
    var temp=[] //Resources
    //var temp2=[] //Topic Switch
    if(this.pdfSource=="" && f['src']=="http://localhost:4200/"){
      temp.push(this.auth.getSession())
      //temp2.push(this.auth.getSession())
      var name = document.getElementById(id).textContent
      temp.push(this.dicForDoc[name][1])
      //temp2.push(this.dicForDoc[name][1])
      temp.push(name)
      temp.push("doc2")
      temp.push("flag")
      // temp2.push("doc2")
      // temp2.push("flag")
      var current = new Date()
      var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      this.docStartTime = current.getTime()
      temp.push(startTime)
      //temp2.push(startTime)
      this.logsForResources.push(temp)
      this.pointerForDoc=[this.logsForResources.length-1,current.getTime()]

    }else{
      var name = document.getElementById(id).textContent
      this.logsForResources[this.logsForResources.length-1][3]=name
      var current = new Date
      var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      console.log(this.logsForResources[this.logsForResources.length-1][2])
      if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
        this.logsForResources[this.logsForResources.length-1][4]="2"
        this.logsForResources[this.pointerForDoc[0]].push(endtime)
        this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
      }else if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
        this.logsForResources[this.logsForResources.length-1][4]="3"
        this.logsForResources[this.pointerForVideo[0]].push(endtime)
        this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
      }
      
      this.docStartTime=current.getTime()
      temp.push(this.auth.getSession())
      var name = document.getElementById(id).textContent
      console.log(name)
      temp.push(this.dicForDoc[name][1])
      temp.push(name)
      temp.push("doc2")
      temp.push("flag")
      var current = new Date()
      var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      this.docStartTime = current.getTime()
      temp.push(startTime)
      this.logsForResources.push(temp)
      this.pointerForDoc=[this.logsForResources.length-1,startTime]
    }
    /////////////////Resources Csv///////////////////////
    ////////////////Topic_time csv////////////////////////
    if(this.subtopic!=this.dicForDoc[document.getElementById(id).textContent][1]){
      
      this.subtopic = this.dicForDoc[document.getElementById(id).textContent][1]
      var n = new Date()
      var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      var t=[]
      if(this.startTopicTime!=undefined){
        var endTime = n.getTime()
        this.logsForTopicTime[this.logsForTopicTime.length-1][3]=endTime
        this.logsForTopicTime[this.logsForTopicTime.length-1][4]=endTime-this.startTopicTime
      }
      t=[this.auth.getSession(),this.subtopic,startTime,"",""]
      this.startTopicTime=n.getTime()
      this.logsForTopicTime.push(t)
      
    }
    ////////////////Topic_time csv////////////////////////
    this.pdfSource = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "";
    document.getElementById("pdf-section").style.display = "";
  
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
    var temp=[]
    var name=""
    var f = document.getElementById('videoFrame')
    if(this.pdfSource=="" && f['src']=="http://localhost:4200/"){
      temp.push(this.auth.getSession())
      name = document.getElementById(id).textContent
      temp.push(this.dicForVideo[name][1])
      temp.push(name)
      temp.push("doc2")
      temp.push("flag")
      var current = new Date()
      var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      this.docStartTime = current.getTime()
      temp.push(startTime)
      this.logsForResources.push(temp)
      this.pointerForVideo = [this.logsForResources.length-1,this.docStartTime]
    }else{
      var current = new Date()
      name = document.getElementById(id).textContent
      this.logsForResources[this.logsForResources.length-1][3]=name
      var current = new Date
      var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      
      if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
        this.logsForResources[this.logsForResources.length-1][4]="1"
        this.logsForResources[this.pointerForDoc[0]].push(endtime)
        this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
      }else if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
        this.logsForResources[this.logsForResources.length-1][4]="4"
        this.logsForResources[this.pointerForVideo[0]].push(endtime)
        this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
      }
      
      this.docStartTime=current.getTime()
      temp.push(this.auth.getSession())
      var name = document.getElementById(id).textContent
      temp.push(this.dicForVideo[name][1])
      temp.push(name)
      temp.push("doc2")
      temp.push("flag")
      var current = new Date()
      var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      this.docStartTime = current.getTime()
      temp.push(startTime)
      this.logsForResources.push(temp)
      this.pointerForVideo=[this.logsForResources.length-1,this.docStartTime]

    }
    ////////////////Topic_time csv////////////////////////
    if(this.subtopic!=this.dicForVideo[document.getElementById(id).textContent][1]){
      
      this.subtopic = this.dicForVideo[document.getElementById(id).textContent][1]
      var n = new Date()
      var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      var t=[]
      if(this.startTopicTime!=undefined){
        var endTime = n.getTime()
        this.logsForTopicTime[this.logsForTopicTime.length-1][3]=endTime
        this.logsForTopicTime[this.logsForTopicTime.length-1][4]=endTime-this.startTopicTime
      }
      t=[this.auth.getSession(),this.subtopic,startTime,"",""]
      this.startTopicTime=n.getTime()
      this.logsForTopicTime.push(t)
      
    }
    ////////////////Topic_time csv////////////////////////
    
    try{
      f['src'] = this.dic2[id]
    }catch{
      f['src'] = ""
    }
  
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "";
    document.getElementById("video-section").style.display = "";

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

  quizAttempt(id){

    this.data.setQuizType(this.dicForQuiz[id])
    if(this.pointerForDoc.length){
      this.logsForResources[this.logsForResources.length-1][3]=this.data.getQuizType()+" Quiz"
      var current = new Date
      var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
        this.logsForResources[this.logsForResources.length-1][4]="2"
        this.logsForResources[this.pointerForDoc[0]].push(endtime)
        this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
        
      }else if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
        this.logsForResources[this.logsForResources.length-1][4]="3"
        this.logsForResources[this.pointerForVideo[0]].push(endtime)
        this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
      }
      this.pointerForDoc=[]
    }
    if(this.pointerForVideo.length){
      this.logsForResources[this.logsForResources.length-1][3]=this.data.getQuizType()+" Quiz"
      var current = new Date
      var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      
      if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
        this.logsForResources[this.logsForResources.length-1][4]="4"
        this.logsForResources[this.pointerForVideo[0]].push(endtime)
        this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
      }
      this.pointerForVideo=[]
    }
    this.router.navigateByUrl('/Quiz')
  }

}


/*
P => V 1
P => P 2 
V => P 3
V => V 4
P => Q 5
V => Q 6
Q => Q (Directly jumping on quiz) 7
*/