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

  currentQuestionIndex = 0;
  progressValue: number;
  questions = questionsList;
  pv: String;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // this.initAnimations();
    this.increaseProgressValue();
  }

  // initAnimations() {
  //   gsap.from(this.main.nativeElement, {
  //     delay: 0.2,
  //     duration: 0.4,
  //     opacity: 0,
  //     y: -20,
  //   });
  //   gsap.from(this.questionContainer.nativeElement.childNodes, {
  //     delay: 0.5,
  //     duration: 0.4,
  //     opacity: 0,
  //     y: -20,
  //     stagger: 0.15,
  //   });
  //   gsap.from(this.menu.nativeElement.childNodes, {
  //     delay: 0.4,
  //     duration: 0.4,
  //     opacity: 0,
  //     y: -20,
  //     stagger: 0.15,
  //   });
  //   gsap.from(this.search.nativeElement.childNodes, {
  //     delay: 0.8,
  //     duration: 0.4,
  //     opacity: 0,
  //     y: -20,
  //     stagger: 0.15,
  //   });
  //   gsap.from(this.logo.nativeElement.childNodes, {
  //     delay: 0.3,
  //     duration: 0.4,
  //     opacity: 0,
  //     y: -20,
  //   });
  //   gsap.from(this.actions.nativeElement.childNodes, {
  //     delay: 0.6,
  //     duration: 0.4,
  //     opacity: 0,
  //     y: -20,
  //   });
  //   gsap.from(this.progress.nativeElement.childNodes, {
  //     delay: 0.7,
  //     duration: 0.4,
  //     opacity: 0,
  //     y: -20,
  //   });
  // }

  increaseProgressValue(): void {
    this.progressValue =(100 * (this.currentQuestionIndex + 1)) / this.questions.length;
    this.pv = this.progressValue.toFixed(1);
    if (this.currentQuestionIndex === 0) {
      // gsap.to(this.slider.nativeElement, {
      //   delay: 0.7,
      //   duration: 0.6,
      //   width: `${this.progressValue}%`,
      // });
      this.slider.nativeElement.style.width = `${this.progressValue}%`;
      console.log(this.progressValue.toFixed(2));
    } else {
      this.slider.nativeElement.style.width = `${this.progressValue}%`;
      console.log(this.progressValue.toFixed(2));
      // gsap.to(this.slider.nativeElement, {
      //   duration: 0.6,
      //   width: `${this.progressValue}%`,
      // });
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


  openNav() {
    this.opened = false;
    document.getElementById("mySidebar").style.width = "18%";
    // document.getElementById("main").style.marginLeft = "0";
    document.getElementById("arrow-Open").style.display = "none";
    document.getElementById("arrow-Close").style.display = "block";
    document.getElementById("mySidebar").style.marginLeft = "0";
    console.log("closed")
  }
  
  closeNav() {
    this.opened = true;
    document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft= "0";
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
}
