import { Component, OnInit } from '@angular/core';
import {QuestionFormat} from '../shared/quetions';

import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router'

const qConst : QuestionFormat[] = []
//   {
//     id: '0',
//     qNo: '1',
//     q: 'Which of the following statements should be used to obtain a remainder after dividing 3.14 by 2.1 ?',
//     o1: 'rem = 3.14 % 2.1;',
//     o2: 'rem = modf(3.14, 2.1);',
//     o3: 'rem = fmod(3.14, 2.1);',
//     o4: 'Remainder cannot be obtain in floating point division',
//   },
//   {
//     id: '1',
//     qNo: '2',
//     q: 'class Test { \n int i;\n } \n class Main { \n public static void main(String args[]) { \n Test t; \n     System.out.println(t.i); \n}' ,
//     o1: 'example00',
//     o2: 'example01',
//     o3: 'example02',
//     o4: 'example03',
//   },
//   {
//     id: '2',
//     qNo: '3',
//     q: 'what is anvcbcvxbvccd',
//     o1: 'example000',
//     o2: 'example001',
//     o3: 'example002',
//     o4: 'example003',
//   },
//   {
//     id: '3',
//     qNo: '4',
//     q: 'what is gfhfghfgh',
//     o1: 'example0000',
//     o2: 'example0001',
//     o3: 'example0002',
//     o4: 'example0003',
//   }
// ];

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  pra: any;
  que_no: any;
  ques = qConst;
  k = 0;
  sques = {
    no: 0,
    q: "",
    Question: "",
    Question_Type: "",
    o1: ["","","",""]
  };

  ans = []
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if(this.ques.length==0){
      this.from_csv()
    }else{
      this.sques = qConst[this.k];
            
      //console.log(this.sques.Question)
      this.sques.Question = this.replaceAll(this.sques.Question,"\n","<br>&nbsp;&nbsp;")
      this.pra = this.sques.Question
      this.que_no = this.sques.no
    }
    
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
            for(var i=0;i<21;i++){
              var option = data[i]["Options"].split(',')
              var x = {
                no: (i+1),
                q:j.toString(),
                Question: data[i]["Question"],
                Question_Type: data[i]["Question Type"],
                o1: option
              }
              qConst.push(x);
              j++;
            }
            this.sques = qConst[this.k];
            
            //console.log(this.sques.Question)
            this.sques.Question = this.replaceAll(this.sques.Question,"\n","<br> &nbsp;&nbsp;&nbsp;")
            this.pra = this.sques.Question
            this.que_no = this.sques.no
            //alert(this.sques.Question)
            
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
    this.sques = qConst[parseInt(qno)]
    this.pra = this.sques.Question
    this.k = parseInt(qno)
    this.que_no = parseInt(qno)+1
  }

  nextque(){
    if(this.k+1<this.ques.length){
      this.k++;
      this.sques = qConst[this.k];
      this.pra = this.sques.Question
      this.que_no=this.sques.no
    }
    //console.log(this.sques.Question)
  }

  prevque(){
    if(this.k-1>=0){
      this.k--;
      this.sques = qConst[this.k];
      this.pra = this.sques.Question
      this.que_no=this.sques.no
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
  
}
