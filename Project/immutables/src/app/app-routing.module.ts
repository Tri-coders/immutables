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

const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'Login', component: LoginappComponent},
  {path: 'Register', component: RegistrationappComponent},
  //{path: 'Quiz', component: QuizComponent,canActivate: [AuthGuardService]},
  {path: 'Quiz', component: QuizComponent, canDeactivate: [CanDeactivateGuardService]},
  {path: 'Quiz2', component: Quiz2Component},
  {path: 'ContactUs', component: ContactusComponent},
  {path: 'Sidebar', component:SidebarComponent},
  {path: 'Document', component:DocumentComponent},
  {path: 'Studyroom', component:StudyroomComponent},
  {path: '', redirectTo: '/Home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [HomeComponent, LoginappComponent, RegistrationappComponent, QuizComponent, SidebarComponent, Quiz2Component, StudyroomComponent]
