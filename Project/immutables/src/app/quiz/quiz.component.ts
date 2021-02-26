import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {QuestionFormat} from '../shared/quetions';

import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router'
import { DatasendService } from '../datasend.service';

const qConst : QuestionFormat[] = []


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  opened = false;
  pra: any;
  codeText: any;
  que_no: any;
  ques = qConst;
  k = 0;
  sques = {
    no: 0,
    q: "",
    Question: "",
    code: "",
    Question_Type: "",
    o1: ["","","",""],
    ans: []
  };
  NumberOfQuestions = 21;
  quizStartTime;
  startTime;
  endTime;
  scqAnsSelected= new Map();
  mcqAnsSelected= new Map();
  Quizstatus;
  
  //variable to store options chages 
  //optionchanges=[]
  //optionchanges = new Array();

  constructor(private auth: AuthenticationService, private router: Router, private data: DatasendService) { }

  
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

  ngOnInit() {
    var current = new Date();
    this.quizStartTime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
    this.startTime = current.getTime();
    this.Quizstatus = 0

    this.from_csv()
    document.getElementById("question_no_link"+this.que_no).className="active"

  }
  ngOnDestroy(){
    alert("End Test")
    var current = new Date();
    this.endTime = current.getTime();
    this.data.addlogs((this.endTime-this.startTime))
    this.data.sendtoserver()

    var current = new Date();
    var quizEndTime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();

    var score = 0;
    for(var i=0; i<3;i++){
      var tempans=0
      // alert("tempans" +tempans)
      // alert("score "+ score)
      var temp = this.scqAnsSelected.get(i+1)
      
      var dic = new Map()
      
      for(var k=0;k<qConst[i]["ans"].length;k++){
        //option numbers selected
        dic.set(qConst[i]["ans"][k],0)
      }
      //alert(qConst[i]["o1"][temp[0]])
      console.log(dic)
      if(temp){
        for(var j=0;j<qConst[i]["o1"].length;j++){
          // alert(qConst[i]["o1"][temp[j]-1])
          // alert(dic.has(qConst[i]["o1"][temp[j]-1]))
          if(temp[j]!=0 && dic.has(qConst[i]["o1"][temp[j]-1]))
            //alert("ans++ "+qConst[i]["o1"][temp[j]-1])
            tempans+=1
        }
      }
      // alert("tempans "+tempans)
      // alert("ansL "+qConst[i]["ans"].length)
      score+=(tempans/qConst[i]["ans"].length)
      // alert("score "+score)
    }
    this.data.sendtoserverQuizScore(["QuizScore",this.auth.getSession(),this.data.getQuizType(),score,this.Quizstatus,this.quizStartTime,quizEndTime,this.endTime-this.startTime])
  }

  replaceAll(string, search, replace) {
    string = string.split(search).join(replace);
    var k=0;
    var str = ""
    var str2 = ""
    var i = 0
    while(i<string.length){
      if(string[i]=="{"){
        k+=3
      }else if(string[i]=="}"){
        k-=3;
      }
      if(string[i]=="<" && string[i+1]=="b" && string[i+2]=="r"){
        str+="<br>"
        i+=4
        for(var j=0;j<k;j++){
          str+="&nbsp;"
        }
        continue
      }else if(string[i]==" "){
        str+="&nbsp;"
      }else{
        str+=string[i]
      }
      i+=1
    }
    //console.log(str2)
    return str;
  }

  from_csv(){
    
    this.auth.quiz().subscribe(
      (data)=>{
          if(data.error){
              alert(data.error)
          }else{
            var j = 1;
            // for(var i=0;i<this.NumberOfQuestions;i++){
            //   var option = [];
            //   if(data[i]["A"])
            //     option.push(data[i]["A"])
            //   if(data[i]["B"])
            //     option.push(data[i]["B"])
            //   if(data[i]["C"])
            //     option.push(data[i]["C"])
            //   if(data[i]["D"])
            //     option.push(data[i]["D"])
            //   var ansoption = data[i]["Answers"].split(',')
            //   var codetemp = this.replaceAll(data[i]["Code"],"\n","<br> &nbsp;&nbsp;&nbsp;")
            //   var x = {
            //     no: (i+1),
            //     q:j.toString(),
            //     Question: data[i]["Question"],
            //     code: codetemp,
            //     Question_Type: data[i]["Question Type"],
            //     o1: option,
            //     ans: ansoption
            //   }
            //   qConst.push(x);
            //   j++;
            // }
            qConst.length = 0;
            var noOfQue=this.NumberOfQuestions;
            var i = 0;
            while(noOfQue>0 && i<data.length){
              if(data[i]["Question Tag"]==this.data.getQuizType()){
                noOfQue-=1
                var option = [];
                if(data[i]["A"])
                  option.push(data[i]["A"])
                if(data[i]["B"])
                  option.push(data[i]["B"])
                if(data[i]["C"])
                  option.push(data[i]["C"])
                if(data[i]["D"])
                  option.push(data[i]["D"])
                var ansoption = data[i]["Answers"].split(',')
                var codetemp = this.replaceAll(data[i]["Code"],"\n","<br> &nbsp;&nbsp;&nbsp;")
                var x = {
                  no: j,
                  q:j.toString(),
                  Question: data[i]["Question"],
                  code: codetemp,
                  Question_Type: data[i]["Question Type"],
                  o1: option,
                  ans: ansoption
                }
                qConst.push(x);
                j++;
              }
              i++;
            }
            this.sques = qConst[this.k];
            //alert(this.sques.Question_Type)
            //console.log(this.sques.Question)
            this.sques.code = this.replaceAll(this.sques.code,"\n","<br> &nbsp;&nbsp;&nbsp;")
            this.codeText = this.sques.code
            this.pra = this.sques.Question
            this.que_no = this.sques.no
            
            //alert(this.sques.Question)
            this.data.sendtoserver()
            this.data.addlogs(this.auth.getSession())
            this.data.addlogs(this.data.getQuizType())
            this.data.addlogs("quiz")
            this.data.addlogs([this.que_no,this.sques.Question_Type])
            
          }
      },
      error=>{
          console.error(error)
      }
    )
  }

  
  select(qno){
    // if(qno === 0)
    // {
    //   document.getElementById("back_button").style.display="none";
    //   this.sques = qConst[qno];
    // }
    // else{
    //   document.getElementById("back_button").style.display="";
    //   this.sques = qConst[qno];
    // }
      if(document.getElementById("question_no_link"+this.que_no).className!="done")
        document.getElementById("question_no_link"+this.que_no).className=""

    var temp = this.que_no
    this.sques = qConst[parseInt(qno)]
    this.pra = this.sques.Question
    this.codeText = this.sques.code
    this.k = parseInt(qno)
    this.que_no = parseInt(qno)+1


    if(temp!=this.que_no){
      //this.optionchanges.push([this.que_no])
      // this.data.addlogs([this.que_no])
      var current = new Date();
      this.endTime = current.getTime();
      this.data.addlogs((this.endTime-this.startTime))
      this.startTime=this.endTime;
      this.data.addlogs([this.que_no,this.sques.Question_Type])
    }

    document.getElementById("question_no_link"+this.que_no).className="active"
  }

  nextque(){
    if(this.k+1<this.ques.length){
      if(document.getElementById("question_no_link"+this.que_no).className!="done")
        document.getElementById("question_no_link"+this.que_no).className=""
      this.k++;
      this.sques = qConst[this.k];
      this.pra = this.sques.Question
      this.codeText = this.sques.code
      this.que_no=this.sques.no

      var current = new Date();
      this.endTime = current.getTime();
      this.data.addlogs((this.endTime-this.startTime))
      this.startTime=this.endTime;
      this.data.addlogs([this.que_no,this.sques.Question_Type])
      document.getElementById("question_no_link"+this.que_no).className="active"

    }
    
  }

  prevque(){
    if(this.k-1>=0){
      if(document.getElementById("question_no_link"+this.que_no).className!="done")
        document.getElementById("question_no_link"+this.que_no).className=""
      this.k--;
      this.sques = qConst[this.k];
      this.pra = this.sques.Question
      this.codeText = this.sques.code
      this.que_no=this.sques.no

      var current = new Date();
      this.endTime = current.getTime();
      this.data.addlogs((this.endTime-this.startTime))
      this.startTime=this.endTime;
      this.data.addlogs([this.que_no,this.sques.Question_Type])

      document.getElementById("question_no_link"+this.que_no).className="active"

    }
    
  }

  numToSSColumn(num){
    var s = ''
    var t = 0;
  
    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = (num - t)/26 | 0;
    }
    return s || undefined;
  }
  
  //Options changes
  handleChange(evt){ 
    //this.optionchanges[this.optionchanges.length-1].push(evt);
    this.data.addlogsAtPosition(this.data.getlength()-1,evt)
    if(this.sques.Question_Type=="MCQ"){
      try{
        if(this.scqAnsSelected.get(this.que_no)[evt-1]==0)
          this.scqAnsSelected.get(this.que_no)[evt-1]=evt
        else
          this.scqAnsSelected.get(this.que_no)[evt-1]=0
          this.scqAnsSelected.set(this.que_no,this.scqAnsSelected.get(this.que_no))
      }catch(err){
        var temp = []
        for(var i=0;i<this.sques.o1.length;i++){
          if(i+1==evt)
            temp.push(evt)
          else
            temp.push(0)
        }
        this.scqAnsSelected.set(this.que_no,temp)
      }
    }else{
      this.scqAnsSelected.set(this.que_no,evt)
    }
    console.log(this.scqAnsSelected.get(this.que_no))
    var c=0
    for(var i=0;i<4;i++){
      if(this.keyexist(this.que_no,i)!=-1){
        document.getElementById("question_no_link"+this.que_no).className="done"
        c++
      }
    }
    if(c==0)
      document.getElementById("question_no_link"+this.que_no).className="active"
  }

  keyexist(que,count){
    if(this.sques.Question_Type=="MCQ"){
      if(this.scqAnsSelected.has(que) && this.scqAnsSelected.get(que)[count]!=0){
        return count+1
      }else{
        return -1
      }
    }else{
      if(this.scqAnsSelected.has(que)){
        return this.scqAnsSelected.get(que)
      }
      return -1
    }
  }

  clearChoices(que){
    var id = "option"+this.scqAnsSelected.get(que)
    var element = <HTMLInputElement> document.getElementById(id);
    element.checked = false
    this.scqAnsSelected.delete(que)
    this.data.addlogsAtPosition(this.data.getlength()-1,0)
    document.getElementById("question_no_link"+this.que_no).className="active"
  
  }

  endTest(){
    this.Quizstatus = 1;
  }


  openNav() {
    this.opened = false;
    document.getElementById("mySidebar").style.width = "18%";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("arrow-Open").style.display = "none";
    document.getElementById("arrow-Close").style.display = "block";
    document.getElementById("mySidebar").style.marginLeft = "0";
    console.log("closed")
  }
  
  closeNav() {
    this.opened = true;
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("arrow-Open").style.display = "block";
    document.getElementById("arrow-Close").style.display = "none";
    document.getElementById("mySidebar").style.marginLeft = "-30px";

    console.log("opened")

  }

  togglesidebar(){
    // this.opened = !this.opened;
    if (this.opened) {
      // console.log("opened");
      this.openNav();
    } else {
      // console.log("Closed");
      this.closeNav();
    }
  }  

  onClose(){
    this.opened = false;

    setTimeout( () => { var x = document.getElementById("ngs");
    //x.style.transform = "translateX(" + (-300) + "px) ";
    x.style.width = "35px";
    
    //y.style.marginLeft = "-25px";

    }, 250 );
    var y = document.getElementById("open-sidebar");
    y.style.transform = "translateX(" + (0) + "px) ";
    
    var arrowOpen = document.getElementById("arrow-Open");
    arrowOpen.style.display = "";
    var arrowClose = document.getElementById("arrow-Close");
    arrowClose.style.display = "none";
    
  }

  onOpen(){
    this.opened = true;
    var x = document.getElementById("ngs");
    //x.style.transform = "translateX(" + (300) + "px) ";
    x.style.width = "100%";

    var y = document.getElementById("open-sidebar");
    y.style.transform = "translateX(" + (300) + "px) ";
    //y.style.marginLeft = "275px";
    
    var arrowOpen = document.getElementById("arrow-Open");
    arrowOpen.style.display = "none";
    var arrowClose = document.getElementById("arrow-Close");
    arrowClose.style.display = "";

  }


}