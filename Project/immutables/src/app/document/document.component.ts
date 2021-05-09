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
    "11": "http://142.93.210.1:3000/pdf/video?video_name=Classes and Objects.mp4",
  "12": "http://142.93.210.1:3000/pdf/video?video_name=Classes Methods.mp4",
  "13": "http://142.93.210.1:3000/pdf/video?video_name=Method Overloading.mp4",
  "14": "http://142.93.210.1:3000/pdf/video?video_name=Method Overriding.mp4",
  "150": "http://142.93.210.1:3000/pdf/video?video_name=Inheritance.mp4",
  "151": "http://142.93.210.1:3000/pdf/video?video_name=Single Level Inheritance.mp4",
  "152": "http://142.93.210.1:3000/pdf/video?video_name=Multi Level Inheritance.mp4",
  "160": "http://142.93.210.1:3000/pdf/video?video_name=Polymorphism.mp4",
  "161": "http://142.93.210.1:3000/pdf/video?video_name=Polymorphism example.mp4"
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
    "Classes and Objects.mp4":["Introduction of Classes and Objects","Classes and Objects"],
    "Classes Methods.mp4": ["Classes and Objects: Method","Classes Methods"],
    "Method Overloading.mp4": ["Classes and Objects: Method","Method Overloading"],
    "Method Overriding.mp4": ["Classes and Objects: Method","Method Overriding"],
    "Inheritance.mp4": ["Advanced concept of OOPs","Inheritance"],
    "Single Level Inheritance.mp4": ["Advanced concept of OOPs","Inheritance"],
    "Multi Level Inheritance.mp4": ["Advanced concept of OOPs","Inheritance"],
    "Polymorphism.mp4": ["Advanced concept of OOPs","Polymorphism"],
    "Polymorphism example.mp4": ["Advanced concept of OOPs","Polymorphism"]

  }

  credentials: pdfData = {
    name: ""
  }

  pdfPageNumber=1
  totalPages
  zoomPdf=1
  rotationPdf=0

  logsForResources=[]
  docEndTime=0
  docStartTime=0
  pointerForDoc=[]
  pointerForVideo=[]
  pointer=[-1,-1]

  logsForDocument=[]
  pageStartTime

  logsForTopicSwitch=[]
  switchStartTime
  pointerForDocSwitchLog=[]
  pointerForVideoSwitchLog=[]

  logsForTopicTime = []
  subtopic=""
  startTopicTime

  URL
  sessionID
  constructor(private auth: AuthenticationService, private router: Router, private data: DatasendService) {}

  //////////////////////////PDFViewer//////////////////////////////////////////
  pdfSource = ""

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.pdfSource!=""){
      if(event.key=="ArrowRight"){
        if(this.pdfPageNumber==this.totalPages){
          return
        }
        this.pdfPageNumber+=1
        var current = new Date
        var time = current.getTime()
        this.logsForDocument[this.logsForDocument.length - 1][3]=time-this.pageStartTime
        var temp = [this.auth.getSession(),this.logsForDocument[this.logsForDocument.length - 1][1],this.pdfPageNumber,"NAN"]
        
        var current = new Date
        this.docStartTime = current.getTime()
        if(this.logsForDocument.length!=0){
          this.logsForDocument[this.logsForDocument.length-1][3]=this.docStartTime-this.pageStartTime
        }
        this.pageStartTime=current.getTime()
        this.logsForDocument.push(temp)
        this.pageStartTime = current.getTime()
      }

      if(event.key=="ArrowLeft"){
        if(this.pdfPageNumber==1){
          return
        }
        this.pdfPageNumber-=1
        var current = new Date
        var time = current.getTime()
        this.logsForDocument[this.logsForDocument.length - 1][3]=time-this.pageStartTime
        var temp = [this.auth.getSession(),this.logsForDocument[this.logsForDocument.length - 1][1],this.pdfPageNumber,"NAN"]
        var current = new Date
        this.docStartTime = current.getTime()
        if(this.logsForDocument.length!=0){
          this.logsForDocument[this.logsForDocument.length-1][3]=this.docStartTime-this.pageStartTime
        }
        this.pageStartTime=current.getTime()
        this.logsForDocument.push(temp)
        this.pageStartTime = current.getTime()
      }
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
    //console.log(this.totalPages)
    if(this.pdfPageNumber==this.totalPages){
      return
    }
    this.pdfPageNumber+=1
    var current = new Date
    var time = current.getTime()
    this.logsForDocument[this.logsForDocument.length - 1][3]=time-this.pageStartTime
    var temp = [this.auth.getSession(),this.logsForDocument[this.logsForDocument.length - 1][1],this.pdfPageNumber,"NAN"]
    var current = new Date
    this.docStartTime = current.getTime()
    if(this.logsForDocument.length!=0){
      this.logsForDocument[this.logsForDocument.length-1][3]=this.docStartTime-this.pageStartTime
    }
    
    this.pageStartTime=current.getTime()
    this.logsForDocument.push(temp)
    this.pageStartTime = current.getTime()

  }
  Previous(){
    if(this.pdfPageNumber==1){
      return
    }
    this.pdfPageNumber-=1
    var current = new Date
    var time = current.getTime()
    this.logsForDocument[this.logsForDocument.length - 1][3]=time-this.pageStartTime
    var temp = [this.auth.getSession(),this.logsForDocument[this.logsForDocument.length - 1][1],this.pdfPageNumber,"NAN"]
    var current = new Date
    this.docStartTime = current.getTime()
    if(this.logsForDocument.length!=0){
      this.logsForDocument[this.logsForDocument.length-1][3]=this.docStartTime-this.pageStartTime
    }
    this.pageStartTime=current.getTime()
    this.logsForDocument.push(temp)
    this.pageStartTime = current.getTime()
  }
  jumpPagePdf(evt){
    if(evt.target.value<=this.totalPages && evt.target.value>0){
      this.pdfPageNumber=evt.target.value
      var current = new Date
      var time = current.getTime()
      this.logsForDocument[this.logsForDocument.length - 1][3]=time-this.pageStartTime
      var temp = [this.auth.getSession(),this.logsForDocument[this.logsForDocument.length - 1][1],this.pdfPageNumber,"NAN"]
      var current = new Date
      this.docStartTime = current.getTime()
      if(this.logsForDocument.length!=0){
        this.logsForDocument[this.logsForDocument.length-1][3]=this.docStartTime-this.pageStartTime
      }
      this.pageStartTime=current.getTime()
      this.logsForDocument.push(temp)
      this.pageStartTime = current.getTime()
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
    //console.log(this.pdfSource)
    // if(Object.keys(dic).length === 0){
    //   this.from_csv()
    // }
    this.drag()
    this.URL = window.location.origin
    this.sessionID=this.auth.getSession();
  }

  // ngOnDestroy(){
  //   var current = new Date
  //   var time = current.getTime()
  //   //console.log(this.logsForDocument.length)
  //   if(this.logsForDocument.length!=0){
  //     this.logsForDocument[this.logsForDocument.length - 1].push(time-this.pageStartTime)
  //     this.logsForDocument.push("document")
  //     this.auth.logsdata(this.logsForDocument)
  //         .subscribe(
  //           (data) => {
  //             if (data.error) {
  //               console.log(data.error)
  //             } else {
  //               this.logsForDocument=[]
  //               //alert(data)
  //             }
  //           },
  //           error => {
  //             console.error(error)
  //           }
  //         )
  //   }

  //   if(this.pointerForDoc.length || this.pointerForVideo.length){
  //     var current = new Date
  //     var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      
  //     if(this.pointerForDoc.length){
  //       this.logsForResources[this.logsForResources.length-1][3]="NAN"
  //       if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
  //         this.logsForResources[this.logsForResources.length-1][4]="2"
  //         this.logsForResources[this.pointerForDoc[0]].push(endtime)
  //         this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
  //       }
  //     }
  //     if(this.pointerForVideo.length){
  //       this.logsForResources[this.logsForResources.length-1][3]="NAN"
  //       if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
  //         this.logsForResources[this.logsForResources.length-1][4]="4"
  //         this.logsForResources[this.pointerForVideo[0]].push(endtime)
  //         this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
  //       }
  //       }
  //   }else{
  //     var temp = [this.auth.getSession(),this.data.getQuizType(),this.data.getQuizType()+" Quiz"]
  //     this.logsForResources.push(temp)
  //   }
  //   this.logsForResources.push("Resources")
  //   this.auth.logsdata(this.logsForResources)
  //   .subscribe(
  //     (data) => {
  //       if (data.error) {
  //         console.log(data.error)
  //       } else {
  //         this.logsForResources=[]
  //         //alert(data)
  //       }
  //     },
  //     error => {
  //       console.error(error)
  //     }
  //   )

  //   if(this.pointerForDocSwitchLog.length || this.pointerForVideoSwitchLog.length){
  //     var current = new Date
  //     var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
      
  //     if(this.pointerForDocSwitchLog.length){
  //       this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]="NAN"
  //       this.logsForTopicSwitch[this.pointerForDocSwitchLog[0]].push(endtime)
  //       this.logsForTopicSwitch[this.pointerForDocSwitchLog[0]].push(current.getTime()-this.pointerForDocSwitchLog[1])
        
  //     }
  //     if(this.pointerForVideoSwitchLog.length){
  //       this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]="NAN"
  //         this.logsForTopicSwitch[this.pointerForVideoSwitchLog[0]].push(endtime)
  //         this.logsForTopicSwitch[this.pointerForVideoSwitchLog[0]].push(current.getTime()-this.pointerForVideoSwitchLog[1])
  //     }
  //   }else{
  //     var temp2 = [this.auth.getSession(),this.data.getQuizType(),this.data.getQuizType()+" Quiz"]
  //     this.logsForTopicSwitch.push(temp2)
  //   }
  //   this.logsForTopicSwitch.push("TopicSwitch")
  //   this.auth.logsdata(this.logsForTopicSwitch)
  //   .subscribe(
  //     (data) => {
  //       if (data.error) {
  //         console.log(data.error)
  //       } else {
  //         this.logsForTopicSwitch=[]
  //         //alert(data)
  //       }
  //     },
  //     error => {
  //       console.error(error)
  //     }
  //   )

  //   ////////////////Topic_time csv////////////////////////
    
  //   if(this.startTopicTime!=undefined){
  //     var n =new Date()
  //     var endTime = n.getTime()
  //     this.logsForTopicTime[this.logsForTopicTime.length-1][3]=endTime
  //     this.logsForTopicTime[this.logsForTopicTime.length-1][4]=endTime-this.startTopicTime
  //   }
  //   this.logsForTopicTime.push("ToicTimeLog")
  //   this.auth.logsdata(this.logsForTopicTime)
  //   .subscribe(
  //     (data) => {
  //       if (data.error) {
  //         console.log(data.error)
  //       } else {
  //         this.logsForTopicTime=[]
  //         //alert(data)
  //       }
  //     },
  //     error => {
  //       console.error(error)
  //     }
  //   )
  //   ////////////////Topic_time csv////////////////////////
    
  // }
  ngOnDestroy(){
    ////////////////////////For Document//////////////////////////
    var current = new Date
    var time = current.getTime()
    //console.log(this.logsForDocument.length)
    try{
    if(this.logsForDocument.length!=0){
      console.log(this.logsForDocument)
      this.logsForDocument[this.logsForDocument.length - 1][3]=time-this.pageStartTime
      this.logsForDocument.push("document")
      this.auth.logsdata(this.logsForDocument)
        .subscribe(
          (data) => {
            if (data.error) {
              console.log(data.error)
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
  }catch(e){
    console.log(e)
  }
    ////////////////////////For Document//////////////////////////
    /////////////////////////Resources//////////////////////////
    if(this.logsForResources.length!=0){
      console.log(this.pointer)
      if(this.pointer[0]!=-1 && this.logsForResources[this.pointer[0]][7]=="NAN"){
        this.logsForResources[this.pointer[0]][7]=time-this.pointer[1]
      }
      try{
        this.logsForResources[this.logsForResources.length-1][7]=time-this.docEndTime
        this.logsForResources[this.logsForResources.length-2][7]=time-this.docEndTime
      }catch(e){
        console.log("error")
      }
      this.logsForResources.push("Resources")
      this.auth.logsdata(this.logsForResources)
        .subscribe(
          (data) => {
            if (data.error) {
              console.log(data.error)
            } else {
              this.logsForResources=[]
              //alert(data)
            }
          },
          error => {
            console.error(error)
          }
        )
    }
    /////////////////////////Resources//////////////////////////
    ////////////////////////Topic Switch///////////////////////
    if(this.logsForTopicSwitch.length!=0){
      if(this.pointer[0]!=-1 && this.logsForTopicSwitch[this.pointer[0]][6]=="NAN"){
        this.logsForTopicSwitch[this.pointer[0]][6]=time-this.pointer[1]
      }
      try{
        this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][6]=time-this.docEndTime
        this.logsForTopicSwitch[this.logsForTopicSwitch.length-2][6]=time-this.docEndTime
      }catch(e){
        console.log("error")
      }
      this.logsForTopicSwitch.push("TopicSwitch")
      this.auth.logsdata(this.logsForTopicSwitch)
        .subscribe(
          (data) => {
            if (data.error) {
              console.log(data.error)
            } else {
              this.logsForTopicSwitch=[]
              //alert(data)
            }
          },
          error => {
            console.error(error)
          }
        )
    }
    ////////////////////////Topic Switch///////////////////////
    ////////////////////////Topic Time/////////////////////////
    if(this.logsForTopicTime.length!=0){
      this.logsForTopicTime[this.logsForTopicTime.length-1][4]=time-this.startTopicTime
      this.logsForTopicTime.push("ToicTimeLog")
      this.auth.logsdata(this.logsForTopicTime)
        .subscribe(
          (data) => {
            if (data.error) {
              console.log(data.error)
            } else {
              this.logsForTopicTime=[]
              //alert(data)
            }
          },
          error => {
            console.error(error)
          }
        )
    }
    ////////////////////////Topic Time/////////////////////////
  }


  // updatePdfName1(id) {
    
  //   var f = document.getElementById('videoFrame')
    
  //   /////////////////Document Csv//////////////////////
  //   var temp=[]
  //   if(this.pdfSource==""){
  //     temp = [this.auth.getSession(),document.getElementById(id).textContent,this.pdfPageNumber]
  //     var current = new Date
  //     this.pageStartTime = current.getTime()
  //     this.logsForDocument.push(temp)
  //   }else{
  //     var current = new Date
  //     var time = current.getTime()
  //     this.logsForDocument[this.logsForDocument.length - 1].push(time-this.pageStartTime)
  //     this.pdfPageNumber=1
  //     temp = [this.auth.getSession(),document.getElementById(id).textContent,this.pdfPageNumber]
  //     var current = new Date
  //     this.pageStartTime = current.getTime()
  //     this.logsForDocument.push(temp)
  //   }
    
  //   /////////////////Document Csv//////////////////////
  //   /////////////////Resources Csv///////////////////////
  //   var temp=[] //Resources
  //   var temp2=[] //Topic Switch
    
  //   //alert(f['src'])
  //   if(this.pdfSource=="" && f['src']==this.URL+"/"){
  //     temp.push(this.auth.getSession())
  //     temp2.push(this.auth.getSession())//Topic Switch
  //     var name = document.getElementById(id).textContent
  //     temp.push(this.dicForDoc[name][1])
  //     temp2.push(this.dicForDoc[name][1])//Topic Switch
  //     temp.push(name)
  //     temp.push("doc2")
  //     temp.push("flag")
  //     temp2.push("doc2")//Topic Switch
  //     temp2.push("type")//Topic Switch
  //     var current = new Date()
  //     var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
  //     this.docStartTime = current.getTime()
  //     this.switchStartTime = current.getTime()//Topic Switch
  //     temp.push(startTime)
  //     temp2.push(startTime)//Topic Switch
  //     this.logsForResources.push(temp)
  //     this.logsForTopicSwitch.push(temp2)//Topic Switch
  //     this.pointerForDoc=[this.logsForResources.length-1,current.getTime()]
  //     this.pointerForDocSwitchLog=[this.logsForTopicSwitch.length-1,current.getTime()]

  //   }else{
  //     var name = document.getElementById(id).textContent
  //     var current = new Date
  //     var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
  //     ////////////////////Topic Switch/////////////////////////
  //     try{
  //       console.log("test 1", this.logsForTopicSwitch[this.logsForTopicSwitch.length-1])
  //       if(this.dicForDoc[this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]][1]!=this.dicForDoc[name][1]){
  //         if(this.dicForDoc[this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]]){
  //           this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]=this.dicForDoc[name][1]
  //           this.logsForTopicSwitch[this.pointerForDocSwitchLog[0]].push(endtime)
  //           this.logsForTopicSwitch[this.pointerForDocSwitchLog[0]].push(current.getTime()-this.pointerForDocSwitchLog[1])
  //         }else if(this.dicForVideo[this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]][1]!=this.dicForVideo[name][1]){
  //           this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]=this.dicForVideo[name][1]
  //           this.logsForTopicSwitch[this.pointerForVideoSwitchLog[0]].push(endtime)
  //           this.logsForTopicSwitch[this.pointerForVideoSwitchLog[0]].push(current.getTime()-this.pointerForVideoSwitchLog[1])
  //         }
  //       }
  //     }catch(err){
  //       //console.log(err)
  //       // console.log("please chalu hoja")
  //     }
  //     ////////////////////Topic Switch/////////////////////////
      
  //     this.logsForResources[this.logsForResources.length-1][3]=name
      
  //     //console.log(this.logsForResources[this.logsForResources.length-1][2])
  //     if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
  //       this.logsForResources[this.logsForResources.length-1][4]="2"
  //       this.logsForResources[this.pointerForDoc[0]].push(endtime)
  //       this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
  //     }else if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
  //       this.logsForResources[this.logsForResources.length-1][4]="3"
  //       this.logsForResources[this.pointerForVideo[0]].push(endtime)
  //       this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
  //     }
      
  //     this.docStartTime=current.getTime()
  //     temp.push(this.auth.getSession())
  //     temp2.push(this.auth.getSession())//Topic Switch
  //     var name = document.getElementById(id).textContent
  //     //console.log(name)
  //     temp.push(this.dicForDoc[name][1])
  //     temp.push(name)
  //     temp.push("doc2")
  //     temp.push("flag")
      
  //     temp2.push(this.dicForDoc[name][1])//Topic Switch
  //     temp2.push("doc2")//Topic Switch
  //     temp2.push("type")//Topic Switch
  //     var current = new Date()
  //     var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
  //     this.docStartTime = current.getTime()
  //     temp.push(startTime)
  //     temp2.push(startTime)//Topic Switch
  //     this.logsForResources.push(temp)
  //     this.logsForTopicSwitch.push(temp2)//Topic Switch
  //     this.pointerForDoc=[this.logsForResources.length-1,startTime]
  //     this.pointerForDocSwitchLog=[this.logsForTopicSwitch.length-1,startTime]//Topic Switch
  //   }
  //   /////////////////Resources Csv///////////////////////
  //   ////////////////Topic_time csv////////////////////////
  //   if(this.subtopic!=undefined && this.subtopic!=this.dicForDoc[document.getElementById(id).textContent][1]){
      
  //     this.subtopic = this.dicForDoc[document.getElementById(id).textContent][1]
  //     var n = new Date()
  //     var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
  //     var t=[]
  //     if(this.startTopicTime!=undefined){
  //       var endTime = n.getTime()
  //       this.logsForTopicTime[this.logsForTopicTime.length-1][3]=endTime
  //       this.logsForTopicTime[this.logsForTopicTime.length-1][4]=endTime-this.startTopicTime
  //     }
  //     t=[this.auth.getSession(),this.subtopic,startTime,"",""]
  //     this.startTopicTime=n.getTime()
  //     this.logsForTopicTime.push(t)
      
  //   }
  //   ////////////////Topic_time csv////////////////////////
  //   this.pdfSource = this.URL+"/pdf/pdfname?name="+document.getElementById(id).textContent;
    
  //   document.getElementById("section1").style.display = "none";
  //   document.getElementById("section2").style.display = "";
  //   document.getElementById("pdf-section").style.display = "";
  
  // }

  updatePdfName(id){
    var current = new Date
    this.docStartTime = current.getTime()
    var startTime = current.getHours().toString()+":"+current.getMinutes().toString()+":"+current.getSeconds().toString()
    
    /////////////////Document Csv//////////////////////
    var tempForDoc=[this.auth.getSession(),document.getElementById(id).textContent,this.pdfPageNumber,"NAN"]
    if(this.logsForDocument.length!=0){
      this.logsForDocument[this.logsForDocument.length-1][3]=this.docStartTime-this.pageStartTime
    }
    this.pdfPageNumber=1
    this.pageStartTime=startTime
    this.logsForDocument.push(tempForDoc)
    /////////////////Document Csv//////////////////////
    /////////////////Resources Csv///////////////////////
    
    var tempForResource=[this.sessionID,this.dicForDoc[document.getElementById(id).textContent][1],document.getElementById(id).textContent,"NAN","NAN",startTime,"NAN","NAN"]
    var tempForTopicSwitch=[this.sessionID,this.dicForDoc[document.getElementById(id).textContent][1],"NAN","NAN",startTime,"NAN","NAN"]
    if(this.logsForResources.length!=0){
      var prev=this.logsForResources.length-1
      this.logsForResources[prev][3]=document.getElementById(id).textContent
      this.logsForTopicSwitch[prev][2]=this.dicForDoc[document.getElementById(id).textContent][1]
      
      if(this.logsForResources[prev][2] in this.dicForDoc){
        this.logsForResources[prev][4]="2"  
        this.logsForTopicSwitch[prev][3]="2"
        this.logsForResources[prev][7]=this.docStartTime-this.docEndTime
        this.logsForTopicSwitch[prev][6]=this.docStartTime-this.docEndTime
      }
      else if(this.pointer[0]!=-1){
        this.logsForResources[prev][4]="3"
        this.logsForTopicSwitch[prev][3]="3"
        this.logsForResources[this.pointer[0]][7]=this.docStartTime-this.pointer[1]
        this.logsForTopicSwitch[this.pointer[0]][6]=this.docStartTime-this.pointer[1]
        this.pointer=[prev,this.docEndTime]
      }else{
        this.logsForResources[prev][4]="3"
        this.logsForTopicSwitch[prev][3]="3"
        this.pointer=[prev,this.docEndTime]
      }
    }
    this.docEndTime=this.docStartTime
    this.logsForResources.push(tempForResource)
    this.logsForTopicSwitch.push(tempForTopicSwitch)
    /////////////////Resources Csv///////////////////////
    ////////////////Topic_time csv////////////////////////
    if(this.subtopic!=this.dicForDoc[document.getElementById(id).textContent][1]){
      this.subtopic=this.dicForDoc[document.getElementById(id).textContent][1]
      var tempForTopicTime = [this.sessionID,this.subtopic,startTime,"NAN","NAN"]
      if(this.logsForTopicTime.length!=0){
        this.logsForTopicTime[this.logsForTopicTime.length-1][4]=this.docStartTime-this.startTopicTime
      }
      this.startTopicTime=this.docStartTime
      this.logsForTopicTime.push(tempForTopicTime)
    }
    ////////////////Topic_time csv////////////////////////
    // console.log(this.logsForResources)
    this.pdfSource = this.URL+"/pdf/pdfname?name="+document.getElementById(id).textContent;
    
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "";
    document.getElementById("pdf-section").style.display = "";
  }
 
  updateVideoName(id){
    var f = document.getElementById('videoFrame')
    /////////////////Resources Csv///////////////////////
    var current = new Date
    this.docStartTime = current.getTime()
    var startTime = current.getHours().toString()+":"+current.getMinutes().toString()+":"+current.getSeconds().toString()
    console.log(document.getElementById(id).textContent)
    var tempForResource=[this.sessionID,this.dicForVideo[document.getElementById(id).textContent][1],document.getElementById(id).textContent,"NAN","NAN",startTime,"NAN","NAN"]
    var tempForTopicSwitch=[this.sessionID,this.dicForVideo[document.getElementById(id).textContent][1],"NAN","NAN",startTime,"NAN","NAN"]
    if(this.logsForResources.length!=0){
      var prev=this.logsForResources.length-1
      this.logsForResources[prev][3]=document.getElementById(id).textContent
      this.logsForTopicSwitch[prev][2]=this.dicForVideo[document.getElementById(id).textContent][1]
      
      
      if(this.logsForResources[prev][2] in this.dicForVideo){
        this.logsForResources[prev][4]="4"  
        this.logsForTopicSwitch[prev][3]="4"
        this.logsForResources[prev][7]=this.docStartTime-this.docEndTime
        this.logsForTopicSwitch[prev][6]=this.docStartTime-this.docEndTime
      }
      else if(this.pointer[0]!=-1){
        this.logsForResources[prev][4]="1"
        this.logsForTopicSwitch[prev][3]="1"
        this.logsForResources[this.pointer[0]][7]=this.docStartTime-this.pointer[1]
        this.logsForTopicSwitch[this.pointer[0]][6]=this.docStartTime-this.pointer[1]
        this.pointer=[prev,this.docEndTime]
      }else{
        this.logsForResources[prev][4]="1"
        this.logsForTopicSwitch[prev][3]="1"
        this.pointer=[prev,this.docEndTime]
      }
    }
    this.docEndTime=this.docStartTime
    this.logsForResources.push(tempForResource)
    this.logsForTopicSwitch.push(tempForTopicSwitch)
    /////////////////Resources Csv///////////////////////
     ////////////////Topic_time csv////////////////////////
     if(this.subtopic!=this.dicForVideo[document.getElementById(id).textContent][1]){
      this.subtopic=this.dicForVideo[document.getElementById(id).textContent][1]
      var tempForTopicTime = [this.sessionID,this.subtopic,startTime,"NAN","NAN"]
      if(this.logsForTopicTime.length!=0){
        this.logsForTopicTime[this.logsForTopicTime.length-1][4]=this.docStartTime-this.startTopicTime
      }
      this.startTopicTime=this.docStartTime
      this.logsForTopicTime.push(tempForTopicTime)
    }
    ////////////////Topic_time csv////////////////////////
    console.log(id)
    try{
      f['src'] = this.dic2[id]
    }catch{
      f['src'] = ""
    }
  
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "";
    document.getElementById("video-section").style.display = "";
  }

  // updateVideoName1(id){
  //   var temp=[]
  //   var temp2=[]//Topic Switch
  //   var name=""
  //   var f = document.getElementById('videoFrame')
  //   if(this.pdfSource=="" && f['src']==this.URL+"/"){
  //     temp.push(this.auth.getSession())
  //     temp2.push(this.auth.getSession())//Topic Switch
  //     name = document.getElementById(id).textContent
  //     temp.push(this.dicForVideo[name][1])
  //     temp.push(name)
  //     temp.push("doc2")
  //     temp.push("flag")
  //     temp2.push(this.dicForVideo[name][1])//Topic Switch
  //     temp2.push("doc2")//Topic Switch
  //     temp2.push("type")//Topic Switch
  //     var current = new Date()
  //     var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
  //     this.docStartTime = current.getTime()
  //     this.startTopicTime = current.getTime()
  //     temp.push(startTime)
  //     temp2.push(startTime)//Topic Switch
  //     this.logsForResources.push(temp)
  //     this.logsForTopicSwitch.push(temp2)//Topic Switch
  //     this.pointerForVideo = [this.logsForResources.length-1,this.docStartTime]
  //     this.pointerForDocSwitchLog=[this.logsForTopicSwitch.length-1,this.switchStartTime]//Topic Switch
  //   }else{
  //     var current = new Date()
  //     name = document.getElementById(id).textContent
  //     this.logsForResources[this.logsForResources.length-1][3]=name
  //     var current = new Date
  //     var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();

  //     ////////////////////Topic Switch/////////////////////////
  //     try{
  //       if(this.dicForDoc[this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]][1]!=this.dicForDoc[name][1]){
  //         if(this.dicForDoc[this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]]){
  //           this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]=this.dicForDoc[name][1]
  //           this.logsForTopicSwitch[this.pointerForDocSwitchLog[0]].push(endtime)
  //           this.logsForTopicSwitch[this.pointerForDocSwitchLog[0]].push(current.getTime()-this.pointerForDocSwitchLog[1])
  //         }else if(this.dicForVideo[this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]][1]!=this.dicForVideo[name][1]){
  //           this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]=this.dicForVideo[name][1]
  //           this.logsForTopicSwitch[this.pointerForVideoSwitchLog[0]].push(endtime)
  //           this.logsForTopicSwitch[this.pointerForVideoSwitchLog[0]].push(current.getTime()-this.pointerForVideoSwitchLog[1])
  //         }
  //       }
  //     }catch(err){
  //       //console.log(err)
  //     }
  //     ////////////////////Topic Switch/////////////////////////
      
  //     if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
  //       this.logsForResources[this.logsForResources.length-1][4]="1"
  //       this.logsForResources[this.pointerForDoc[0]].push(endtime)
  //       this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
  //     }else if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
  //       this.logsForResources[this.logsForResources.length-1][4]="4"
  //       this.logsForResources[this.pointerForVideo[0]].push(endtime)
  //       this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
  //     }
      
  //     this.docStartTime=current.getTime()
  //     temp.push(this.auth.getSession())
  //     temp2.push(this.auth.getSession())//Topic Switch
  //     var name = document.getElementById(id).textContent
  //     temp.push(this.dicForVideo[name][1])
  //     temp.push(name)
  //     temp.push("doc2")
  //     temp.push("flag")
      
  //     temp2.push(this.dicForVideo[name][1])//Topic switch
  //     temp2.push("doc2")//Topic switch
  //     temp2.push("flag")//Topic switch
  //     var current = new Date()
  //     var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
  //     this.docStartTime = current.getTime()
  //     this.switchStartTime=current.getTime()//Topic switch
  //     temp.push(startTime)
  //     temp2.push(startTime)//Topic switch
  //     this.logsForResources.push(temp)
  //     this.logsForTopicSwitch.push(temp2)//Topic switch
  //     this.pointerForVideo=[this.logsForResources.length-1,this.docStartTime]
  //     this.pointerForVideoSwitchLog=[this.logsForTopicSwitch.length-1,this.switchStartTime]//Topic switch
  //   }
  //   ////////////////Topic_time csv////////////////////////
  //   if(this.subtopic!=undefined && this.subtopic!=this.dicForVideo[document.getElementById(id).textContent][1]){
      
  //     this.subtopic = this.dicForVideo[document.getElementById(id).textContent][1]
  //     var n = new Date()
  //     var startTime= current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
  //     var t=[]
      
  //     //alert(this.startTopicTime)
  //     if(this.startTopicTime!=undefined && f['src']!=this.URL+"/"){
  //       var endTime = n.getTime()
  //       this.logsForTopicTime[this.logsForTopicTime.length-1][3]=endTime
  //       this.logsForTopicTime[this.logsForTopicTime.length-1][4]=endTime-this.startTopicTime
  //     }
  //     t=[this.auth.getSession(),this.subtopic,startTime,"",""]
  //     this.startTopicTime=n.getTime()
  //     this.logsForTopicTime.push(t)
      
  //   }
  //   ////////////////Topic_time csv////////////////////////
    
  //   try{
  //     f['src'] = this.dic2[id]
      
  //     alert(f['src'])
  //   }catch{
  //     f['src'] = ""
  //   }
  
  //   document.getElementById("section1").style.display = "none";
  //   document.getElementById("section2").style.display = "";
  //   document.getElementById("video-section").style.display = "";

  // }

  //#######################################Video#####################################

  quizAttempt(id){

    this.data.setQuizType(this.dicForQuiz[id])
    // var current = new Date
    // var endtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
    // if(this.pointerForDoc.length){
    //   this.logsForResources[this.logsForResources.length-1][3]=this.data.getQuizType()+" Quiz"
      
    //   if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
    //     this.logsForResources[this.logsForResources.length-1][4]="2"
    //     this.logsForResources[this.pointerForDoc[0]].push(endtime)
    //     this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
        
    //   }else if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
    //     this.logsForResources[this.logsForResources.length-1][4]="3"
    //     this.logsForResources[this.pointerForVideo[0]].push(endtime)
    //     this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
    //   }
    //   this.pointerForDoc=[]
    // }

    // //////////////////////////Topic Switch//////////////////////
    // if(this.pointerForDocSwitchLog.length){
    //   this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]=this.data.getQuizType()+" Quiz"
    //   this.logsForTopicSwitch[this.pointerForDocSwitchLog[0]].push(endtime)
    //   this.logsForTopicSwitch[this.pointerForDocSwitchLog[0]].push(current.getTime()-this.pointerForDocSwitchLog[1])
       
    //   this.pointerForDocSwitchLog=[]
    // }
    // //////////////////////////Topic Switch//////////////////////
    // if(this.pointerForVideo.length){
    //   this.logsForResources[this.logsForResources.length-1][3]=this.data.getQuizType()+" Quiz"
      
    //   if(this.dicForVideo[this.logsForResources[this.logsForResources.length-1][2]]){
    //     this.logsForResources[this.logsForResources.length-1][4]="4"
    //     this.logsForResources[this.pointerForVideo[0]].push(endtime)
    //     this.logsForResources[this.pointerForVideo[0]].push(current.getTime()-this.pointerForVideo[1])
    //   }else if(this.dicForDoc[this.logsForResources[this.logsForResources.length-1][2]]){
    //     this.logsForResources[this.logsForResources.length-1][4]="1"
    //     this.logsForResources[this.pointerForDoc[0]].push(endtime)
    //     this.logsForResources[this.pointerForDoc[0]].push(current.getTime()-this.pointerForDoc[1])
        
    //   }
    //   this.pointerForVideo=[]
    // }
    // //////////////////////////Topic Switch//////////////////////
    // if(this.pointerForVideoSwitchLog.length){
    //   this.logsForTopicSwitch[this.logsForTopicSwitch.length-1][2]=this.data.getQuizType()+" Quiz"
    //   this.logsForTopicSwitch[this.pointerForVideoSwitchLog[0]].push(endtime)
    //   this.logsForTopicSwitch[this.pointerForVideoSwitchLog[0]].push(current.getTime()-this.pointerForVideoSwitchLog[1])
       
    //   this.pointerForVideoSwitchLog=[]
    // }
    // //////////////////////////Topic Switch//////////////////////

    this.router.navigateByUrl('/Quiz')
  }

  
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

  funct(){
    alert("ALA")
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