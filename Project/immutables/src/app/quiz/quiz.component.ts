import { Component, OnInit } from '@angular/core';
import {QuestionFormat} from '../shared/quetions';

const qConst : QuestionFormat[] = [
  {
    id: '0',
    qNo: '1',
    q: 'Which of the following statements should be used to obtain a remainder after dividing 3.14 by 2.1 ?',
    o1: 'rem = 3.14 % 2.1;',
    o2: 'rem = modf(3.14, 2.1);',
    o3: 'rem = fmod(3.14, 2.1);',
    o4: 'Remainder cannot be obtain in floating point division',
  },
  {
    id: '1',
    qNo: '2',
    q: 'class Test { \n int i;\n } \n class Main { \n public static void main(String args[]) { \n Test t; \n     System.out.println(t.i); \n}' ,
    o1: 'example00',
    o2: 'example01',
    o3: 'example02',
    o4: 'example03',
  },
  {
    id: '2',
    qNo: '3',
    q: 'what is anvcbcvxbvccd',
    o1: 'example000',
    o2: 'example001',
    o3: 'example002',
    o4: 'example003',
  },
  {
    id: '3',
    qNo: '4',
    q: 'what is gfhfghfgh',
    o1: 'example0000',
    o2: 'example0001',
    o3: 'example0002',
    o4: 'example0003',
  }
];

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  ques = qConst;

  sques = qConst[0];

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

  constructor() { }

  ngOnInit(): void {
  }

}
