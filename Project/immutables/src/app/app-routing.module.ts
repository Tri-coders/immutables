import { DocumentComponent } from './document/document.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginappComponent } from './loginapp/loginapp.component';
import { RegistrationappComponent } from './registrationapp/registrationapp.component';
import { ContactusComponent } from './contactus/contactus.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service'
import { QuizComponent} from './quiz/quiz.component';
import { Quiz2Component} from './quiz2/quiz2.component';
import { StudyroomComponent} from './studyroom/studyroom.component';
import { TopicsComponent} from './topics/topics.component';
import { SelfAssessComponent } from './self-assess/self-assess.component';
import { ActivityComponent } from './activity/activity.component';
import { ReportComponent } from './report/report.component';
import { AboutMetacogComponent } from './about-metacog/about-metacog.component';

const routes: Routes = [
    // {path: 'Home', component: HomeComponent},
    // {path: 'Login', component: LoginappComponent},
    // {path: 'Register', component: RegistrationappComponent},
    // //{path: 'Quiz', component: QuizComponent,canActivate: [AuthGuardService]},
    // {path: 'Quiz', component: QuizComponent, canDeactivate: [CanDeactivateGuardService]},
    // {path: 'Quiz2', component: Quiz2Component},
    // {path: 'ContactUs', component: ContactusComponent,canActivate: [AuthGuardService]},
    // {path: 'Sidebar', component:SidebarComponent},
    // {path: 'Studyroom', component:DocumentComponent,canActivate: [AuthGuardService]},
    // {path: 'Doc', component:StudyroomComponent},
    // {path: 'Topics', component:TopicsComponent,canActivate: [AuthGuardService]},
    // {path: 'SelfAssess', component:SelfAssessComponent,canActivate: [AuthGuardService]},
    // {path: 'Activity', component:ActivityComponent,canActivate: [AuthGuardService]},
    // {path: 'Report', component:ReportComponent,canActivate: [AuthGuardService]},
    // {path: 'About', component:AboutMetacogComponent},
    // {path: '', redirectTo: '/Home', pathMatch: 'full'}
    
  
  {path: 'Home', component: HomeComponent},
  {path: 'Login', component: LoginappComponent},
  {path: 'Register', component: RegistrationappComponent},
  //{path: 'Quiz', component: QuizComponent,canActivate: [AuthGuardService]},
  {path: 'Quiz', component: QuizComponent, canDeactivate: [CanDeactivateGuardService]},
  {path: 'Quiz2', component: Quiz2Component},
  {path: 'ContactUs', component: ContactusComponent},
  {path: 'Sidebar', component:SidebarComponent},
  {path: 'Studyroom', component:DocumentComponent},
  {path: 'Doc', component:StudyroomComponent},
  {path: 'Topics', component:TopicsComponent},
  {path: 'SelfAssess', component:SelfAssessComponent},
  {path: 'Activity', component:ActivityComponent},
  {path: 'Report', component:ReportComponent},
  {path: 'About', component:AboutMetacogComponent},
  {path: '', redirectTo: '/Home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [HomeComponent, LoginappComponent, RegistrationappComponent, QuizComponent, SidebarComponent, Quiz2Component, StudyroomComponent, TopicsComponent, AboutMetacogComponent]
