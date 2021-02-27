import { Component, 
  OnInit, 
  ViewChild,
  ElementRef,
  ChangeDetectorRef, 
} from '@angular/core';
import { Question } from '../models/Question';
// import { gsap } from 'gsap';
import { questionsList } from '../Helpers/questionsList';
@Component({
  selector: 'app-self-assess',
  templateUrl: './self-assess.component.html',
  styleUrls: ['./self-assess.component.scss']
})
export class SelfAssessComponent implements OnInit {
  @ViewChild('slider', { static: true }) slider: ElementRef<HTMLDivElement>;
  @ViewChild('questionContainer', { static: true })
  questionContainer: ElementRef<HTMLDivElement>;
  @ViewChild('answer', { static: true }) answer: ElementRef<HTMLDivElement>;
  @ViewChild('menu', { static: true }) menu: ElementRef<HTMLDivElement>;
  @ViewChild('logo', { static: true }) logo: ElementRef<HTMLDivElement>;
  @ViewChild('search', { static: true }) search: ElementRef<HTMLDivElement>;
  @ViewChild('main', { static: true }) main: ElementRef<HTMLDivElement>;
  @ViewChild('actions', { static: true }) actions: ElementRef<HTMLDivElement>;
  @ViewChild('progress', { static: true }) progress: ElementRef<HTMLDivElement>;

  opened = false;
  currentQuestionIndex = 0;
  progressValue: number;
  questions = questionsList;
  pv: String;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.increaseProgressValue();
  }

    increaseProgressValue(): void {
    this.progressValue =(100 * (this.currentQuestionIndex + 1)) / this.questions.length;
    this.pv = this.progressValue.toFixed(1);
    if (this.currentQuestionIndex === 0) {
      this.slider.nativeElement.style.width = `${this.progressValue}%`;
      console.log(this.progressValue.toFixed(2));
    } else {
      this.slider.nativeElement.style.width = `${this.progressValue}%`;
      console.log(this.progressValue.toFixed(2));
    }
  }

  get question(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  onSelect(answer: HTMLDivElement) {
    this.answer.nativeElement.childNodes.forEach((node: HTMLDivElement) => {
      if (node.classList && node.classList.contains('selected')) {
        node.classList.remove('selected');
      }
    });
    answer.classList.add('selected');
  }

  prev() {
    if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.increaseProgressValue();
            this.cdr.detectChanges();
    }
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.increaseProgressValue();
          this.cdr.detectChanges();
    }
  }

  goToClickedQuestion(count){
    this.currentQuestionIndex = count-1;
    this.increaseProgressValue();
    this.cdr.detectChanges();
  }
  openNav() {
    this.opened = false;
    document.getElementById("mySidebar").style.width = "18%";
    document.getElementById("arrow-Open").style.display = "none";
    document.getElementById("arrow-Close").style.display = "block";
    document.getElementById("mySidebar").style.marginLeft = "0";
    document.getElementById("question_no_links").style.display = "";
    console.log("closed")
  }
  
  closeNav() {
    this.opened = true;
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("arrow-Open").style.display = "block";
    document.getElementById("arrow-Close").style.display = "none";
    document.getElementById("mySidebar").style.marginLeft = "-30px";
    document.getElementById("question_no_links").style.display = "none";

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
}
