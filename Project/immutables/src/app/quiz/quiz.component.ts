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

  ques = qConst;
  k = 0;
  sques = {
    q: "",
    Question: "",
    Question_Type: "",
    o1: ["","","",""]
  };

  ans = []
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.auth.quiz().subscribe(
      (data)=>{
          if(data.error){
              alert(data.error)
          }else{
            var j = 1;
            for(var i=0;i<data.length;i++){
              var option = data[i]["Options"].split(',')
              var x = {
                q:j.toString(),
                Question: data[i]["Question"],
                Question_Type: data[i]["Question Type"],
                o1: option
              }
              qConst.push(x);
              j++;
            }
            this.sques = qConst[this.k];
            alert(this.sques.Question)
          }
      },
      error=>{
          
          console.error(error)
      }
    )
  }

  select(qno: string | number){
    if(qno === 0)
    {
      document.getElementById("back_button").style.display="none";
      this.sques = qConst[qno];
    }
    else{
      document.getElementById("back_button").style.display="";
      this.sques = qConst[qno];
    }
  }

  nextque(){
    this.k++;
    this.sques = qConst[this.k];
    alert(this.sques.Question)
  }

}
