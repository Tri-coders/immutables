import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginappComponent } from './loginapp/loginapp.component';
import { RegistrationappComponent } from './registrationapp/registrationapp.component';
import { ContactusComponent } from './contactus/contactus.component'
import { AuthGuardService } from './auth-guard.service';

import { QuizComponent} from './quiz/quiz.component';

const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'Login', component: LoginappComponent},
  {path: 'Register', component: RegistrationappComponent},
  {path: 'Quiz', component: QuizComponent},
  {path: 'ContactUs', component: ContactusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [HomeComponent, LoginappComponent, RegistrationappComponent, QuizComponent]
