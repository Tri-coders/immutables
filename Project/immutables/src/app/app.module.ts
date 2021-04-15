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
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { ContactusComponent } from './contactus/contactus.component';
import {SidebarModule} from 'ng-sidebar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FabComponent } from './fab/fab.component';
import { DocumentComponent } from './document/document.component';
import { HeaderComponent } from './header/header.component';
import { Quiz2Component } from './quiz2/quiz2.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StudyroomComponent } from './studyroom/studyroom.component';
import { TopicsComponent } from './topics/topics.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { SelfAssessComponent } from './self-assess/self-assess.component';
import { ActivityComponent } from './activity/activity.component';
import { ReportComponent } from './report/report.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartsModule } from 'ng2-charts';
import { AboutMetacogComponent } from './about-metacog/about-metacog.component';

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
    HeaderComponent,
    Quiz2Component,
    StudyroomComponent,
    TopicsComponent,
    SelfAssessComponent,
    ActivityComponent,
    ReportComponent,
    AboutMetacogComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    GoogleChartsModule,
    ChartsModule,
    SidebarModule.forRoot()
  ],
  providers: [AuthGuardService, AuthenticationService, CanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
