import { Component, 
  OnInit, 
  ViewChild,
  ElementRef,
  ChangeDetectorRef, 
} from '@angular/core';
import { Question } from '../models/Question';
// import { gsap } from 'gsap';
import { questionsList } from '../Helpers/questionsList';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
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
  ques=[]
  attempted=0
  constructor(private cdr: ChangeDetectorRef, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.increaseProgressValue();
    this.ques=[]
    for(var i=0;i<52;i++){
      this.ques.push(-1)
    }
  }

  ngDoCheck(){
    try{
      this.attempted=0
      for(var i=0;i<this.ques.length;i++){
        
        //console.log(document.getElementById("question_no_link"+(i+1)).className)
        if(this.ques[i]!=-1){
          this.attempted+=1
          console.log("aya")
          document.getElementById("question_no_link"+(i+1)).className="done"
          console.log("aya2")
        }
        else{
          document.getElementById("question_no_link"+(i+1)).className="" 
        }
      }
      
      document.getElementById("question_no_link"+(this.currentQuestionIndex+1).toString()).className="active"
      if(this.attempted==this.ques.length){
        (<HTMLInputElement> document.getElementById("submitSelfAssesment")).disabled = false;
      }else{
        (<HTMLInputElement> document.getElementById("submitSelfAssesment")).disabled = true;
      }
      
    }catch(err){
      console.log(err)
    }
  }

    increaseProgressValue(): void {
    this.progressValue =(100 * (this.attempted)) / this.questions.length;
    this.pv = this.progressValue.toFixed(1);
    if (this.currentQuestionIndex === 0) {
      this.slider.nativeElement.style.width = `${this.progressValue}%`;
      //console.log(this.progressValue.toFixed(2));
    } else {
      this.slider.nativeElement.style.width = `${this.progressValue}%`;
      //console.log(this.progressValue.toFixed(2));
    }
  }

  get question(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  onSelect(answer) {
    // this.answer.nativeElement.childNodes.forEach((node: HTMLDivElement) => {
    //   if (node.classList && node.classList.contains('selected')) {
    //     node.classList.remove('selected');
    //   }
    // });  
    // answer.classList.add('selected');
    this.ques[this.currentQuestionIndex]=answer
    this.attempted+=1
  }

  keyExist(ind,opt){
    if(this.ques[ind]==-1)
      return -1
    else{
      if(this.ques[ind]==opt)
        return 0
      else return -1
    }
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
  Submit(){
    
    this.ques.unshift(this.auth.getSession())
    this.auth.selfassesment(this.ques).subscribe(
      (data)=>{
        if(data.error){
            alert(data.error)
        }else{
            this.router.navigateByUrl('/Home')
        }
    },
    error=>{
        console.error(error)
    }
    )
  }
}
