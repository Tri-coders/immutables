import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule, routingcomponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { RegistrationappComponent } from './registrationapp/registrationapp.component'
import { LoginappComponent } from './loginapp/loginapp.component'
import { HomeComponent } from './home/home.component'
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service';
import { ContactusComponent } from './contactus/contactus.component';
import {SidebarModule} from 'ng-sidebar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FabComponent } from './fab/fab.component';
import { DocumentComponent } from './document/document.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    routingcomponents,
    QuizComponent,
    RegistrationappComponent,
    LoginappComponent,
    HomeComponent,
    ContactusComponent,
    SidebarComponent,
    FabComponent,
    DocumentComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SidebarModule.forRoot()
  ],
  providers: [AuthGuardService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
