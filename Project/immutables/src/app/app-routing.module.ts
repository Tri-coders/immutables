import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginappComponent } from './loginapp/loginapp.component';
import { RegistrationappComponent } from './registrationapp/registrationapp.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  {path: 'Home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'Login', component: LoginappComponent},
  {path: 'Register', component: RegistrationappComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [HomeComponent, LoginappComponent, RegistrationappComponent]
